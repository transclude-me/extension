import * as utils from 'text-fragments-polyfill/src/text-fragment-utils'
import * as browser from 'webextension-polyfill'
import {renderPreview} from './preview'
import tippy from "tippy.js"

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

async function getHighlightedPageElements(fragment: any) {
	const doc = await loadDocument(fragment.url.href)

	console.log(doc)
	//todo process all directives
	// const ranges: Range[] = utils.processTextFragmentDirective(fragment.directives.text[0], doc)

	const elements: Element[] = utils.processFragmentDirectives(fragment.directives, doc).text
	console.log({elements})
	return elements
}

async function renderFragment(fragment: any) {
	const elements = await getHighlightedPageElements(fragment)

	const preview = renderPreview(elements.flat().map(it=> it.parentElement))
	tippy(fragment.element, {
		content: preview,
		arrow: true,
		animation: 'fade',
		interactive: true,
		theme: 'light',
	})

	// maybe let the utils do markup processing. and then do range finding again and take a parent of the marked up element?
}

async function init() {
	//todo: this should have 2 modes: on-demand and render everything on load

	const fragments = parseFragments(getTextFragmentLinks())
	/**
	 * apparently google blog was a shitty example to start with, because without some js
	 * the getAllTextNodes returns incomplete/weird results
	 */
	console.log({fragments: fragments})

	fragments.map(renderFragment)
}

const getTextFragmentLinks = () => {
	let isFragment = it => it.href.indexOf(":~:") !== -1
	return Array.from(document.links).filter(isFragment)
}


const parseFragments = (fragments) => {
	return fragments.map(it => {
		const url = new URL(it.href)
		const fragmentDirectives = utils.getFragmentDirectives(url.hash)
		return {
			url,
			element: it,
			directives: utils.parseFragmentDirectives(fragmentDirectives),
		}
	})
}

// todo cache
const getPageHtml = async (url: string) =>
	browser.runtime.sendMessage({type: 'fetch-background', url})

const loadDocument = async (url: string) => {
	return new DOMParser().parseFromString(await getPageHtml(url), 'text/html')
}

init()

console.log("syncing")
