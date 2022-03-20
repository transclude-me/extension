import * as utils from 'text-fragments-polyfill/src/text-fragment-utils'
import * as browser from 'webextension-polyfill'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

async function renderFragment(fragment: any) {
	const doc = await loadDocument(fragment.url.href)

	console.log(doc)
	//todo process all directives
	const ranges = utils.processTextFragmentDirective(fragment.directives[0], doc)
	fragment.element.appendChild(ranges[0].commonAncestorContainer)
	console.log({ranges})
}

async function init() {
	const fragments = parseFragments(getTextFragmentLinks())
	/**
	 * apparently google blog was a shitty example to start with, because without some js
	 * the getAllTextNodes returns incomplete/weird results
	 */
	// const fragments = parseFragments([new URL('https://danluu.com/p95-skill/#:~:text=we\'ll%20start%20by%20looking%20at%20overwatch')])
	console.log({fragments: fragments})

	// await renderFragment(fragments[0])
	fragments.map(renderFragment)
	// await delay(100) // todo wut
	// markInPageFragments()
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

const loadDocument = async (url: string) => {
	// const fetched = await fetch(url)
	const fetched = await browser.runtime.sendMessage({type: 'fetch-background', url})

	return new DOMParser().parseFromString(await fetched, 'text/html')
}

init()

console.log("syncing")
