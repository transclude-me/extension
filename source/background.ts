import './options/options-storage'

import * as browser from 'webextension-polyfill'
import {fetchText} from './common/fetch'
import {getHighlightedPageElements} from './text-fragment'

browser.runtime.onMessage.addListener(async (message: any, sender: any) => {
	console.log('background.ts:', message, sender)
	if (message.type === 'fetch-background') {
		return fetchText(message.url)
	}

	if (message.type === 'get-fragment-elements') {
		return getHighlightedPageElements(message.url)
	}
})

browser.action.onClicked.addListener(async () => browser.runtime.openOptionsPage())

const copyPageFragment = 'copy-page-fragment'

browser.contextMenus.create({
	id: copyPageFragment,
	title: 'Copy Page Fragment',
	contexts: ['all'],
})

browser.contextMenus.onClicked.addListener((info, tab) => {
	if (info.menuItemId === copyPageFragment) {
		void browser.tabs.sendMessage(tab?.id!, {type: copyPageFragment, elementId: info.targetElementId})
	}
})
