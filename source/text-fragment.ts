import {
	getFragmentDirectives,
	parseFragmentDirectives,
	processFragmentDirectives, // @ts-ignore no type definitions available
} from 'text-fragments-polyfill/src/text-fragment-utils'
import * as browser from 'webextension-polyfill'
import {fetchText} from './common/fetch'

export const getHighlightedPageElementsFromContentScript = async (url: string): Promise<Array<string>> =>
	browser.runtime.sendMessage({
		type: 'get-fragment-elements',
		url,
	})

/**
 * Todo:
 * caching
 * for headers - probably want to include the following paragraph
 */

export async function getHighlightedPageElements(href: string): Promise<Array<string>> {
	const url = new URL(href)
	const directives = parseFragmentDirectives(getFragmentDirectives(url.hash))

	const doc = await loadDocument(url)

	const elements: Array<Node[]> = processFragmentDirectives(directives, doc).text
	return elements.map(e => getCommonAncestor(e)!.outerHTML)
}

const getCommonAncestor = (nodes: Node[]): HTMLElement | null => {
	if (nodes.length === 1) {
		return nodes[0].parentElement
	}

	return findFirstCommonAncestor(nodes[0], nodes[nodes.length - 1]) as HTMLElement
}

const loadDocument = async (url: URL) =>
	new DOMParser().parseFromString(await fetchText(url.href), 'text/html')

const findFirstCommonAncestor = (nodeA: Node, nodeB: Node): Node => {
	let range = new Range()
	range.setStartBefore(nodeA)
	range.setEndAfter(nodeB)
	// There's a compilication, if nodeA is positioned after
	// nodeB in the document, we created a collapsed range.
	// That means the start and end of the range are at the
	// same position. In that case `range.commonAncestorContainer`
	// would likely just be `nodeB.parentNode`.
	if (range.collapsed) {
		// The old switcheroo does the trick.
		range.setStartBefore(nodeB)
		range.setEndAfter(nodeA)
	}
	return range.commonAncestorContainer
}
