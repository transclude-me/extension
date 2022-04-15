import {fetchText} from './common/fetch'
import {mapAsync} from './common/async'

export async function getStyleNodes(doc: Document, baseUrl: URL) {
	const existingNodes = doc.querySelectorAll('style')
	const nodesFromLinks = await getStyleNodesFromLinks(doc, baseUrl)

	return [...existingNodes, ...nodesFromLinks].map(adoptStyle)
}

const getStyleNodesFromLinks = async (doc: Document, baseUrl: URL): Promise<HTMLStyleElement[]> =>
	mapAsync(
		getStyleLinks(doc, baseUrl),
		async (link) => newStyleNode(doc, await fetchText(link.href)))

function getStyleLinks(doc: Document, baseUrl: URL) {
	const stylesheets = doc.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]')

	return [...stylesheets].filter(element => element.href).map(getUrlWithOriginalBase)

	/**
	 * By default, links will get the URL of the extension page =\
	 * Need to override them back to original URL
	 */
	function getUrlWithOriginalBase(element: HTMLLinkElement) {
		const url = new URL(element.href)
		url.host = baseUrl.host
		url.protocol = baseUrl.protocol
		return url
	}
}

function newStyleNode(doc: Document, style: string) {
	const styleNode = doc.createElement('style')
	styleNode.textContent = style
	return styleNode
}

function adoptStyle(node: HTMLStyleElement) {
	// Otherwise, the variables are not resolved in shadow DOM
	node.textContent = node.textContent?.replace(/:root/g, ':host')!
	return node
}
