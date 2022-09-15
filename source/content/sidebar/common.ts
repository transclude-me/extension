import * as browser from 'webextension-polyfill'

export async function openUrlInSidebar(url: string) {
	adjustHostPageStyle()

	// .parent because we want to send it to the parent if we're in iframe, and it's same as `window` if we are not
	window.parent.postMessage({type: 'add-stack-url', url}, '*')

	return browser.runtime.sendMessage({
		type: 'add-to-history',
		url,
	})
}

function adjustHostPageStyle() {
	const isIframe = window !== window.parent
	if (isIframe) return

	const isWikipedia = window.location.hostname.includes('.wikipedia.org')
	if (isWikipedia) {
		const content = document.getElementById('content')
		if (content) content.style.maxWidth = '800px'
	} else {
		// default case is just make window wider, which works surprisingly well
		document.body.style.width = '150vw'
		// scroll body to the right, so that content is not hidden by sidebar
		document.body.parentElement!.scrollLeft = 10000
	}
}

