import {TextFragmentRenderer} from '../rendering/text-fragment-renderer'
import {IframeRenderer, siteSpecificRenderers} from 'link-summoner'
import {Options} from '../options/options-storage'
import {lazy} from '../common/lazy'

export const getExtensionRenderers = lazy(async () => [
	new TextFragmentRenderer(),
	...siteSpecificRenderers,
	new IframeRenderer(
		await Options.iframe.domainWhitelist(),
		await Options.iframe.subdomainWhitelist()),
])
