import {ReactElement} from "react"
import * as ReactDOM from "react-dom"

import {TextFragmentRenderer} from "./text-fragment-renderer"
import {IframeRenderer} from "./iframe-renderer"
import {WikipediaRenderer} from "./wikipedia-renderer"

export interface LinkRenderer {
	canRender(url: URL): boolean

	render(url: URL): Promise<ReactElement>
}

/**
 * Order is priority
 */
const allRenderers: LinkRenderer[] = [
	new TextFragmentRenderer(),
	new WikipediaRenderer(),
	new IframeRenderer(),
]

export const render = async (link: URL, renderers: LinkRenderer[] = allRenderers): Promise<HTMLElement | null> => {
	// Do pre-check,so we can assume something is going to render and do that async
	if (!canRender(link, renderers)) return null

	const renderContainer = defaultRenderContainer()
	buildReactComponent(renderers, link).then(component => {
		//todo common loading indicator
		ReactDOM.render(component, renderContainer)
	})
	return renderContainer
}

const canRender = (link: URL, renderers: LinkRenderer[] = allRenderers): boolean =>
	renderers.some(renderer => renderer.canRender(link))

const buildReactComponent = (renderers: LinkRenderer[], link: URL) =>
	renderers.find(r => r.canRender(link))?.render(link)

function defaultRenderContainer() {
	const renderContainer = document.createElement('div')
	renderContainer.className = 'link-preview-container'
	return renderContainer
}
