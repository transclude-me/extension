import * as browser from 'webextension-polyfill'

interface Command {
	type: string
}

class BackgroundSimulation {
	iframe: HTMLIFrameElement | undefined
	ongoingExecutions: Map<string, [resolve: (value: any) => void, reject: (reason?: any) => void]> = new Map()

	get url(): string {
		// up_ thing is from manifest being in subdirectory and parcel rewriting the path to `up_` instead of `..`
		return browser.runtime.getURL('up_/content/background-simulation/index.html')
	}

	async setup(): Promise<HTMLIFrameElement> {
		if (this.iframe) return this.iframe
		const iframe = createIframe(this.url)

		this.setupExecutionResultHandler()

		return new Promise(resolve => {
			iframe.onload = () => {
				this.iframe = iframe
				resolve(iframe)
			}
		})
	}

	private setupExecutionResultHandler() {
		window.addEventListener('message', event => {
			if (event.data.type === 'command-result') {
				const [resolve, reject] = this.ongoingExecutions.get(event.data.id)!
				if (event.data.result) {
					resolve(event.data.result)
				} else {
					reject(event.data.error)
				}

				this.ongoingExecutions.delete(event.data.id)
			}
		})
	}

	async execute<T extends Command>(command: T): Promise<any> {
		const commandId = this.initiateExecution(command)
		return new Promise((resolve, reject) => {
			this.ongoingExecutions.set(commandId, [resolve, reject])
		})
	}

	private initiateExecution<T>(command: T) {
		const commandId = crypto.randomUUID()
		this.iframe?.contentWindow?.postMessage({...command, commandId}, '*')
		return commandId
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
