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
	return elements.map(e => {
		const ancestor = getCommonAncestor(e)!
		inlineStyle(ancestor)
		// todo inlineStyleRecursively(ancestor)

		return ancestor.outerHTML
	})
}

function inlineStyleRecursively(element: HTMLElement) {
	inlineStyle(element)
	for (const child of element.children) {
		inlineStyleRecursively(child as HTMLElement)
	}
}

function inlineStyle(element: HTMLElement) {
	/*
	 todo this is better then nothing,
	 but does not actually compute all the styles for the doc downloaded in background
	 part of it, I think is that files are not downloaded when we just parse the doc,
	 can test it with a local file probs
	 and maybe manually inline css

	 todo also this does not handle :before/:after
	*/
	const computedStyle = getComputedStyle(element)
	for (let i = 0; i < computedStyle.length; i++) {
		const name = computedStyle[i]
		element.style.setProperty(name,
			computedStyle.getPropertyValue(name),
			computedStyle.getPropertyPriority(name),
		)
	}
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
