import './options/options-storage'

import * as browser from 'webextension-polyfill'

// TODO: having a message listener here would interfere with ability
//  to returns result from iframe listener 🤔

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
