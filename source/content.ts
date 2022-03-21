import * as utils from 'text-fragments-polyfill/src/text-fragment-utils'
import * as browser from 'webextension-polyfill'
import {renderPreview} from "./preview"

import './content.css'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

async function renderFragment(fragment: any) {
	const doc = await loadDocument(fragment.url.href)

	console.log(doc)
	//todo process all directives
	// const ranges = utils.processTextFragmentDirective(fragment.directives[0], doc)
	// fragment.element.appendChild(ranges[0].commonAncestorContainer)
	// renderPreview(fragment.element)

	renderPreview(fragment.element, await getPageHtml(fragment.url.href))
	// console.log({ranges})
}

async function init() {
	//todo: this should have 2 modes: on-demand and render everything on load

	const fragments = parseFragments(getTextFragmentLinks())
	/**
	 * apparently google blog was a shitty example to start with, because without some js
	 * the getAllTextNodes returns incomplete/weird results
	 */
	// const fragments = parseFragments([new URL('https://danluu.com/p95-skill/#:~:text=we\'ll%20start%20by%20looking%20at%20overwatch')])
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
		utils.parseFragmentDirectives(fragmentDirectives)
		return {
			url,
			element: it,
			directives: utils.parseFragmentDirectives(fragmentDirectives).text,
		}
	})
}

const getPageHtml = async (url: string) =>
	await browser.runtime.sendMessage({type: 'fetch-background', url})

const loadDocument = async (url: string) => {
	// const fetched = await fetch(url)
	const fetched = await getPageHtml(url)

	return new DOMParser().parseFromString(await fetched, 'text/html')
}

init()

console.log("syncing")
