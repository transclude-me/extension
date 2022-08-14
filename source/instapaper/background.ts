import * as browser from 'webextension-polyfill'
import {Runtime} from 'webextension-polyfill'
import {InstapaperLink} from './index'

const logInAndAddInNewTab = ({url, title = ''}: InstapaperLink) =>
	browser.tabs.create({
		url: `https://www.instapaper.com/hello2?u=${encodeURIComponent(url)}&t=${encodeURIComponent(title)}&cookie_notice=1`,
	})

export async function pushToInstapaper(message: any, sender: Runtime.MessageSender) {
	const tabId = sender.tab?.id!
	const type = 'instapaper-push-status'

	try {
		const response = await fetch('https://www.instapaper.com/bookmarklet/post_v5', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: buildRequest(message.instapaperLink),
		})

		if (response.status === 200) {
			return browser.tabs.sendMessage(tabId, {
				type,
				status: 'success',
				response: await response.text(),
			})
		}

		if (response.status === 403) return logInAndAddInNewTab(message.instapaperLink)

		return browser.tabs.sendMessage(tabId, {
			type,
			status: 'failure',
			code: response.status,
		})
	} catch (e) {
		console.log(e)
		return browser.tabs.sendMessage(tabId, {type, status: 'failure'})
	}
}

const buildRequest = ({url, title = ''}: InstapaperLink) =>
	`gr=1&u=${encodeURIComponent(url)}&t=${encodeURIComponent(title)}`

