import {getHighlightedPageElements} from '../../text-fragment'

/**
 * Background page simulation in iframe
 */

window.addEventListener('message', async event => {
	console.log('iframe-background', event.data)
	const {commandId} = event.data
	try {
		/**
		 * Each case must return on successful handling
		 */
		if (event.data.type === 'get-fragment-elements') {
			const result = await getHighlightedPageElements(event.data.url)
			return postResult(commandId, result)
		}
	} catch (e) {
		console.error(e)
		return postError(commandId, e)
	}

	if (commandId) {
		postError(commandId, `No command handler found for ${event.data.type}`)
	}
})

function postToParent(commandId: string, fragment: any) {
	window.parent.postMessage({
		type: 'command-result',
		id: commandId,
		...fragment,
	}, '*')
}

const postError = (commandId: string, message: any) => {
	postToParent(commandId, {error: message})
}

const postResult = (commandId: string, content: any) => {
	postToParent(commandId, {result: content})
}
