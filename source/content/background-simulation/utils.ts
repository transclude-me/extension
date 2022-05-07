import * as browser from 'webextension-polyfill'
import {delay} from '../../common/async'

interface Command {
	type: string
}

class BackgroundSimulation {
	iframe: HTMLIFrameElement | undefined

	get url(): string {
		// up_ thing is from manifest being in subdirectory and parcel rewriting the path to `up_` instead of `..`
		return browser.runtime.getURL('up_/content/background-simulation/index.html')
	}

	async setup(): Promise<HTMLIFrameElement> {
		if (this.iframe) return this.iframe
		const iframe = createIframe(this.url)

		return new Promise(resolve => {
			iframe.onload = () => {
				this.iframe = iframe
				resolve(iframe)
			}
		})
	}

	async execute<T extends Command>(command: T, maxDelaySize: number = 512): Promise<any> {
		const commandId = this.initiateExecution(command)
		const result = await this.waitForResult(commandId, maxDelaySize)
		this.cleanupExecution(commandId)
		return this.parseResult(result)
	}

	private async waitForResult(commandId: string, maxDelaySize: number) {
		let nextDelay = 0
		let result: any
		do {
			await delay(nextDelay)
			result = (await browser.storage.local.get(commandId))[commandId]
			nextDelay = (nextDelay * 2) || 16
		} while (!result || nextDelay < maxDelaySize)

		return result
	}

	private initiateExecution<T>(command: T) {
		const commandId = 'command-' + crypto.randomUUID()
		this.iframe?.contentWindow?.postMessage({...command, commandId}, '*')
		return commandId
	}

	private parseResult(result: any) {
		const parsed = JSON.parse(result)
		if (parsed.error) {
			throw new Error(parsed.error)
		}

		return parsed.result
	}

	private cleanupExecution(commandId: string) {
		return browser.storage.local.remove(commandId)
	}
}

export const backgroundSimulation = new BackgroundSimulation()

function createIframe(url: string) {
	const iframe = document.createElement('iframe')
	iframe.src = url
	iframe.style.display = 'none'
	document.body.appendChild(iframe)
	return iframe
}
