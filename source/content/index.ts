import {Options} from '../options/options-storage'
import {setupEventHandlers} from './copy-fragment'
import {backgroundSimulation} from './background-simulation/utils'
// Todo for some reason this is not working, but direct src import works 🤔
// import {initPreviews, defaultRenderers} from 'link-summoner'
import {initPreviews, IframeRenderer, siteSpecificRenderers} from 'link-summoner/src'
import {TextFragmentRenderer} from '../rendering/text-fragment-renderer'

setupEventHandlers()

const shouldRenderPreviews = async () => {
	// todo maybe per renderer?
	const blockList = await Options.renderBlocklist()
	return blockList.every(domain => !window.location.hostname.endsWith(domain))
}

const loadExtension = async () => {
	if (await shouldRenderPreviews()) {
		await backgroundSimulation.setup()

		await initPreviews({
			renderers: [
				new TextFragmentRenderer(),
				...siteSpecificRenderers,
				new IframeRenderer(
					await Options.iframe.domainWhitelist(),
					await Options.iframe.subdomainWhitelist()),
			],
		})
	}
}

void loadExtension()

