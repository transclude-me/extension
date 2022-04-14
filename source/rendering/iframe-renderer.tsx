import {ReactElement} from 'react'
import {Options} from '../options/options-storage'
import {LinkRenderer} from './link-renderer'

export class IframeRenderer implements LinkRenderer {
	async canRender(url: URL): Promise<boolean> {
		const domainWhitelist = await Options.iframe.domainWhitelist()
		const subdomainWhitelist = await Options.iframe.subdomainWhitelist()

		return domainWhitelist.some(domain => url.hostname.includes(domain)) ||
			subdomainWhitelist.some(domain => url.hostname.endsWith(domain))
	}

	async render(url: URL): Promise<ReactElement> {
		// todo right now the iframe is not preserved on consecutive views?
		// I think that can be tippy's problem though
		return <iframe
			className={'iframe-preview'}
			src={url.href}
		/>
	}
}
