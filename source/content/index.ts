import {Options} from '../options/options-storage'
import {setupEventHandlers} from './copy-fragment'
import {backgroundSimulation} from './background-simulation/utils'
import {initPreviews, IframeRenderer, siteSpecificRenderers, getShadowRoot} from 'link-summoner'
import {TextFragmentRenderer} from '../rendering/text-fragment-renderer'
import {buttonPressPlugin, showOnboardingTooltip} from './onboarding-tooltip'
import shadowCss from 'bundle-text:./shadow.css'
import {setupSidebar} from './sidebar'

setupSidebar()

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

		it.addEventListener('click', (ev: MouseEvent) => {
			console.log('clisk!')
			if (!(ev.altKey && ev.shiftKey)) return

			ev.stopPropagation()
			ev.preventDefault()
			window.postMessage({type: 'add-stack-url', url: it.href}, '*')
			// browser.runtime.sendMessage({
			// 	type: 'add-stack-url',
			// 	url: it.href,
			// })
		})
	})
}

function addExtensionStylesToPopup() {
	const style = document.createElement('style')
	style.innerText = shadowCss

	getShadowRoot().append(style)
}

