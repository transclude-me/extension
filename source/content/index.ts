import {Options} from '../options/options-storage'
import {setupEventHandlers} from './copy-fragment'
import {backgroundSimulation} from './background-simulation/utils'
import {getShadowRoot, initPreviews} from 'link-summoner'
import {buttonPressPlugin, showOnboardingTooltip} from './onboarding-tooltip'
import shadowCss from 'bundle-text:./shadow.css'
import {setupSidebar} from './sidebar'
import {getExtensionRenderers} from './renderer-configuration'

const inIframe = window !== window.parent

if (!inIframe) setupSidebar()

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
			renderers: await getExtensionRenderers(),
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

		const openInSidebar = (ev: MouseEvent) => {
			if (!(ev.altKey && ev.shiftKey)) return

			ev.stopPropagation()
			ev.preventDefault()

			// .parent because we want to send it to the parent if we're in iframe, and it's same as `window` if we are not
			window.parent.postMessage({type: 'add-stack-url', url: it.href}, '*')
		}

		// @ts-ignore todo I'm confused why this does not type check
		it.addEventListener('click', openInSidebar)
	})
}


function addExtensionStylesToPopup() {
	const style = document.createElement('style')
	style.innerText = shadowCss

	getShadowRoot().append(style)
}

