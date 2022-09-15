import {Options} from '../options/options-storage'
import {backgroundSimulation} from './background-simulation/utils'
import {getShadowRoot, initPreviews} from 'link-summoner'
import {buttonPressPlugin, showOnboardingTooltip} from './onboarding-tooltip'
import shadowCss from 'bundle-text:./shadow.css'
import {setupSidebar} from './sidebar'
import {openUrlInSidebar} from './sidebar/common'
import {getExtensionRenderers} from './renderer-configuration'
import {openInSidebarButton, saveToInstapaperButton} from './actions'
import {setupEventHandlers} from './event-handlers'

const inIframe = window !== window.parent

if (!inIframe) setupSidebar()

setupEventHandlers()

const shouldRenderPreviews = async () => {
	// todo maybe per renderer?
	const blockList = await Options.renderBlocklist()
	return blockList.every(domain => !window.location.hostname.endsWith(domain))
}

const shouldOpenInSidebar = (ev: MouseEvent) =>
	ev.altKey && ev.shiftKey

const loadExtension = async () => {
	if (await shouldRenderPreviews()) {
		await backgroundSimulation.setup()

		await initPreviews({
			renderers: await getExtensionRenderers(),
			tippyOptions: {
				plugins: [buttonPressPlugin()],
			},
			postInit(link) {
				const openInSidebar = (ev: MouseEvent) => {
					if (!shouldOpenInSidebar(ev)) return

					ev.stopPropagation()
					ev.preventDefault()

					openUrlInSidebar(link.href)
				}

				// @ts-ignore todo I'm confused why this does not type check
				link.addEventListener('click', openInSidebar)

				showOnboardingTooltip(link, getShadowRoot() as unknown as Element)
			},
			actionProviders: [saveToInstapaperButton, openInSidebarButton],
		})

		addExtensionStylesToPopup()
	}
}

void loadExtension()

function addExtensionStylesToPopup() {
	const style = document.createElement('style')
	style.innerText = shadowCss

	getShadowRoot().append(style)
}

