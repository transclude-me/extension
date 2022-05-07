import './options/options-storage'

import * as browser from 'webextension-polyfill'
import {Runtime} from 'webextension-polyfill'
import {backgroundSimulation} from './content/background-simulation/utils'
import MessageSender = Runtime.MessageSender

browser.runtime.onMessage.addListener(async (message: any, sender: MessageSender) => {
	console.log('background.ts: message received', message, sender)
	try {
		if (message.destination === 'background-simulation') {
			const senderFrames = await browser.webNavigation.getAllFrames({tabId: sender.tab?.id!})
			console.log({senderFrames})
			const frame = senderFrames.find(it => it.url === backgroundSimulation.url)

			return browser.tabs.sendMessage(sender.tab?.id!, message, {frameId: frame?.frameId})
		}
	} catch (e) {
		console.error(e)
	}
})

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
