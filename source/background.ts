import './options/options-storage'

import * as browser from 'webextension-polyfill'

// compatibility between v2 and v3 manifest
browser.action?.onClicked.addListener(async () => browser.runtime.openOptionsPage())
browser.browserAction?.onClicked.addListener(async () => browser.runtime.openOptionsPage())

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
