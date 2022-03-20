import * as utils from 'text-fragments-polyfill/src/text-fragment-utils'
import * as browser from 'webextension-polyfill'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

async function renderFragment(fragment: any) {
	const doc = await loadDocument(fragment.url.href)
	// await 	delay(5000)
	await delay(100) // todo wut

	console.log(doc)
	//todo all directives
	const ranges = utils.processTextFragmentDirective(fragment.directives[0], doc)
	console.log({ranges})
}

function markInPageFragments() {
	let hash = document.location.hash
	if (!hash) {
		const fullUrl = performance.getEntries().find(({entryType}) => entryType === 'navigation',)?.name
		if(fullUrl) hash = new URL(fullUrl).hash
	}
	const fragmentDirectives = utils.getFragmentDirectives(hash)
	const parsedFragmentDirectives = utils.parseFragmentDirectives(
		fragmentDirectives,
	)
	const processedFragmentDirectives = utils.processFragmentDirectives(
		parsedFragmentDirectives,
	)
	console.log({parsedFragmentDirectives, processedFragmentDirectives})
}

async function init() {
	//todo
	await delay(200)
	const fragments = parseFragments(getTextFragmentLinks())
	/**
	 * apparently google blog was a shitty example to start with, because without some js
	 * the getAllTextNodes returns incomplete/weird results
	 */
	// const fragments = parseFragments([new URL('https://danluu.com/p95-skill/#:~:text=we\'ll%20start%20by%20looking%20at%20overwatch')])
	console.log({fragments: fragments})

	await renderFragment(fragments[0])
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
