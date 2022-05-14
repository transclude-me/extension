import {Options} from '../options/options-storage'
import {setupEventHandlers} from './copy-fragment'
import {backgroundSimulation} from './background-simulation/utils'
// Todo for some reason this is not working, but direct src import works 🤔
// import {initPreviews, defaultRenderers} from 'link-summoner'
import {initPreviews, IframeRenderer, siteSpecificRenderers, getShadowRoot} from 'link-summoner/src'
import {TextFragmentRenderer} from '../rendering/text-fragment-renderer'
import {buttonPressPlugin, showOnboardingTooltip} from './onboarding-tooltip'
import shadowCss from 'bundle-text:./shadow.css'

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
			tippyOptions: {
				plugins: [buttonPressPlugin()],
			},
		})

		initOnboardingTooltips()

		addExtensionStylesToPopup()
	}
}

void loadExtension()

function initOnboardingTooltips() {
	Array.from(document.links).forEach(it => {
		void showOnboardingTooltip(it, getShadowRoot() as unknown as Element)
	})
}

function addExtensionStylesToPopup() {
	const style = document.createElement('style')
	style.innerText = shadowCss

	getShadowRoot().append(style)
}

