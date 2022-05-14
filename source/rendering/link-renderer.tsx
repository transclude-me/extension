import {ReactElement} from 'react'
import * as ReactDOM from 'react-dom'

import {IframeRenderer} from './iframe-renderer'
import {WikipediaRenderer} from './wikipedia-renderer'
import {findAsync, someAsync} from '../common/async'

export interface LinkRenderer {
	canRender(url: URL): Promise<boolean>

	render(url: URL): Promise<ReactElement>
}

/**
 * Order is priority
 */
const allRenderers: LinkRenderer[] = [
	new WikipediaRenderer(),
	new IframeRenderer(),
]

export const render = async (link: URL, renderers: LinkRenderer[] = allRenderers): Promise<HTMLElement | null> => {
	// Do pre-check,so we can assume something is going to render and do that async
	if (!await canRender(link, renderers)) return null

	const renderContainer = defaultRenderContainer()
	buildReactComponent(renderers, link)?.then(component => {
		// todo common loading indicator
		ReactDOM.render(component, renderContainer)
	})
	return renderContainer
}

const canRender = async (link: URL, renderers: LinkRenderer[] = allRenderers): Promise<boolean> =>
	someAsync(renderers, renderer => renderer.canRender(link))

const buildReactComponent = async (renderers: LinkRenderer[], link: URL) => {
	const renderer = await findAsync(renderers, r => r.canRender(link))
	if (!renderer) throw new Error('No matching renderer found')

	return renderer.render(link)
}

function defaultRenderContainer() {
	const renderContainer = document.createElement('div')
	renderContainer.className = 'link-preview-container'
	return renderContainer
}
