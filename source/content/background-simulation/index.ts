import * as browser from 'webextension-polyfill'
import {Runtime} from 'webextension-polyfill'
import MessageSender = Runtime.MessageSender
import {getHighlightedPageElements} from '../../text-fragment'

/**
 * Background page simulation in iframe
 */

browser.runtime.onMessage.addListener(async (message: any, sender: MessageSender) => {
	console.log('iframe-background', message, sender)
	try {
		if (message.type === 'get-fragment-elements') {
			return await getHighlightedPageElements(message.url)
		}
	} catch (e) {
		console.error(e)
	}
})
