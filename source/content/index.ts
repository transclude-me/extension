import {Options} from '../options/options-storage'
import {setupEventHandlers} from './copy-fragment'
import {backgroundSimulation} from './background-simulation/utils'
import {getShadowRoot, initPreviews} from 'link-summoner'
import {buttonPressPlugin, showOnboardingTooltip} from './onboarding-tooltip'
import shadowCss from 'bundle-text:./shadow.css'
import {setupSidebar} from './sidebar'
import {openUrlInSidebar} from './sidebar/common'
import {getExtensionRenderers} from './renderer-configuration'
import {createIconButton} from './actions'

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

const openInSidebarButton = createIconButton({
	title: 'Open in sidebar',
	iconUri: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' data-icon=\'menu-open\' width=\'16\' height=\'16\' viewBox=\'0 0 16 16\'%3E%3Cpath d=\'M9.99 11.99h-9c-.55 0-1 .45-1 1s.45 1 1 1h9c.55 0 1-.45 1-1s-.45-1-1-1zm0-5h-9c-.55 0-1 .45-1 1s.45 1 1 1h9c.55 0 1-.45 1-1s-.45-1-1-1zm0-5h-9c-.55 0-1 .45-1 1s.45 1 1 1h9c.55 0 1-.45 1-1s-.45-1-1-1zm5.71 5.3l-2-2a1.003 1.003 0 00-1.71.71v4a1.003 1.003 0 001.71.71l2-2c.18-.18.29-.43.29-.71s-.11-.53-.29-.71z\' fill-rule=\'evenodd\'%3E%3C/path%3E%3C/svg%3E',
	action: link => openUrlInSidebar(link.href),
})

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
			actionProviders: [openInSidebarButton],
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

