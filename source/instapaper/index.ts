import * as browser from 'webextension-polyfill'

export interface InstapaperLink {
	url: string
	title?: string
}

export const saveToInstapaper = (instapaperLink: InstapaperLink) =>
	browser.runtime.sendMessage({
		type: 'push-to-instapaper',
		instapaperLink,
	})

