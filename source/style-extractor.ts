import {fetchText} from './common/fetch'
import {mapAsync} from './common/async'

export async function getStyleNodes(doc: Document) {
	const existingNodes = doc.querySelectorAll('style')
	const nodesFromLinks = await getStyleNodesFromLinks(doc)

	return [...existingNodes, ...nodesFromLinks].map(adoptStyle)
}

const getStyleNodesFromLinks = async (doc: Document): Promise<HTMLStyleElement[]> =>
	mapAsync(getStyleLinks(doc),
		async link => newStyleNode(doc, await fetchText(link)))

function getStyleLinks(doc: Document) {
	const stylesheets = doc.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]')

	return [...stylesheets].map(it => it.href).filter(Boolean)
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
