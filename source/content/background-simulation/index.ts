import * as browser from 'webextension-polyfill'
import {Runtime} from 'webextension-polyfill'
import {getHighlightedPageElements} from '../../text-fragment'
import MessageSender = Runtime.MessageSender

/**
 * Background page simulation in iframe
 */

browser.runtime.onMessage.addListener(async (message: any, sender: MessageSender) => {
	console.log('iframe-background', message, sender)
	if (message.destination !== 'background-simulation') {
		// need this guard because in Chrome sendMessage is indiscriminate and gonna send us
		// all messages from content scripts
		return
	}

	try {
		if (message.type === 'get-fragment-elements') {
			return getHighlightedPageElements(message.url)
		}
	} catch (e) {
		console.error(e)
	}
})

window.addEventListener('message', async event => {
	console.log(event.data)
	const {commandId} = event.data
	try {
		if (event.data.type === 'get-fragment-elements') {
			const result = await getHighlightedPageElements(event.data.url)
			setResult(commandId, result)

			return
		}
	} catch (e) {
		console.error(e)
		setError(commandId, e)
		return
	}

	if (commandId) {
		setError(commandId, `No command handler found for ${event.data.type}`)
	}
})

const setError = (commandId: string, message: any) => {
	browser.storage.local.set({
		[commandId]: JSON.stringify({error: message}),
	})
}

const setResult = (commandId: string, content: any) => {
	browser.storage.local.set({
		[commandId]: JSON.stringify({result: content}),
	})
}
