import {ReactElement} from "react"
import * as ReactDOM from "react-dom"

import {TextFragmentRenderer} from "./text-fragment-renderer"

export interface LinkRenderer {
	canRender(url: URL): Promise<boolean>

	render(url: URL): Promise<ReactElement>
}

/**
 * Order is priority
 */
const allRenderers: LinkRenderer[] = [
	new TextFragmentRenderer(),
]

export const render = async (link: URL, renderers: LinkRenderer[] = allRenderers): Promise<HTMLElement | null> => {
	const reactElement = await buildReactComponent(renderers, link)
	if (!reactElement) return null

	const renderContainer = defaultRenderContainer()
	ReactDOM.render(reactElement, renderContainer)
	return renderContainer
}

const buildReactComponent = (renderers: LinkRenderer[], link: URL) =>
	renderers.find(r => r.canRender(link))?.render(link)

function defaultRenderContainer() {
	const renderContainer = document.createElement('div')
	renderContainer.className = 'link-preview-container'
	return renderContainer
}
