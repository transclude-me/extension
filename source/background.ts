// eslint-disable-next-line import/no-unassigned-import
import './options-storage.js'

import * as browser from 'webextension-polyfill'

browser.runtime.onMessage.addListener(async (message: any, sender: any) => {
	console.log('background.ts:', message, sender)
	if (message.type === 'fetch-background') {
		const response = await fetch(message.url)
		return await response.text()
	}
})
