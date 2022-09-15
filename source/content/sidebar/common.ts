import * as browser from 'webextension-polyfill'

export async function openUrlInSidebar(url: string) {
	// .parent because we want to send it to the parent if we're in iframe, and it's same as `window` if we are not
	window.parent.postMessage({type: 'add-stack-url', url}, '*')

	return browser.runtime.sendMessage({
		type: 'add-to-history',
		url,
	})
}

