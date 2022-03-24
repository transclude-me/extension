import {LinkRenderer} from "./link-renderer"
import {
	getFragmentDirectives,
	parseFragmentDirectives,
	processFragmentDirectives,
} from 'text-fragments-polyfill/src/text-fragment-utils'

import {ReactElement} from "react"
import * as browser from "webextension-polyfill"
import {RawElementAdapter} from "./components/RawElementAdapter"

export class TextFragmentRenderer implements LinkRenderer {
	canRender(url: URL): boolean {
		return url.href.indexOf(":~:") !== -1
	}

	async render(url: URL): Promise<ReactElement> {
		const fragmentDirectives = parseFragmentDirectives(getFragmentDirectives(url.hash))

		const elements = await getHighlightedPageElements(url, fragmentDirectives)

		// todo render placeholder initially & defer actual loading of the fragment by passing in a function
		/**
		 * todo parent is actually a bad abstraction here - only works for withing paragraph highlights
		 * for headers - probably want to include the following paragraph
		 */
		// const preview = renderPreview(elements.flat().map(it=> it.parentElement))

		return <RawElementAdapter elements={elements.flat().map(it => it.parentElement)}/>
	}
}


async function getHighlightedPageElements(url: URL, directives): Promise<Node[]> {
	const doc = await loadDocument(url)

	console.log(doc)

	const elements: Element[] = processFragmentDirectives(directives, doc).text
	console.log({elements})
	return elements
}

// todo inject?
const loadDocument = async (url: URL) => {
	return new DOMParser().parseFromString(await getPageHtml(url), 'text/html')
}

// todo cache
const getPageHtml = async (url: URL) =>
	browser.runtime.sendMessage({type: 'fetch-background', url: url.href})
