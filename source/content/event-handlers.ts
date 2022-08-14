import * as browser from 'webextension-polyfill'
import {copyPageFragment} from './copy-fragment'
import {Notyf} from 'notyf'

export const setupEventHandlers = () => {
	browser.runtime.onMessage.addListener(async message => {
		if (message.type === 'copy-page-fragment') return copyPageFragment().catch(console.error)

		// todo only do this "top level" vs iframes
		if (message.type === 'instapaper-push-status') {
			const notyf = new Notyf({
				position: {
					y: 'top',
					x: 'right',
				},
			})

			if (message.status === 'success') {
				notyf.success('Saved to Instapaper')
			} else {
				notyf.error('Failed to save: ' + message.code)
			}
		}
	})
}
