// eslint-disable-next-line import/no-unassigned-import
import './options-storage.js'

import * as browser from 'webextension-polyfill'
import {fetchText} from "./common/fetch"
import {getHighlightedPageElements} from "./text-fragment"


browser.runtime.onMessage.addListener(async (message: any, sender: any) => {
	console.log('background.ts:', message, sender)
	if (message.type === 'fetch-background') {
		return fetchText(message.url)
	} else if (message.type === 'get-fragment-elements') {
		return getHighlightedPageElements(message.url)
	}
})
