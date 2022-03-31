import tippy, {Instance as Tippy} from "tippy.js"
import {render} from "./rendering/link-renderer"
import {isKeyDown} from "./common/keyboard"

async function initPreview(link: HTMLAnchorElement | HTMLAreaElement) {
	const previewElement = await render(new URL(link.href))
	if (!previewElement) return

	tippy(link, {
		content: previewElement,
		placement: "bottom",
		arrow: true,
		animation: 'fade',
		interactive: true,
		theme: 'light',
		maxWidth: '100%',
		delay: [0, 400],
		onShow(instance: Tippy) {
			if (!isKeyDown('Alt')) return false
		},
	})
}

async function initPreviews() {
	Array.from(document.links).forEach(initPreview)
	//todo: this should have 2 modes: on-demand and render everything on load
}

initPreviews()

const watchAndInitNewLinks = () => {
	const observer = new MutationObserver(mutations => {
		mutations
			.flatMap(mutations => Array.from(mutations.addedNodes))
			.forEach(checkIfLinkAndInit)
	})

	observer.observe(document.body, {childList: true, subtree: true})
}

const checkIfLinkAndInit = node => {
	const isLink = node instanceof HTMLAnchorElement || node instanceof HTMLAreaElement
	if (isLink) {
		initPreview(node)
	} else if (node instanceof HTMLElement) {
		node.querySelectorAll('a, area').forEach(initPreview)
	}
}

watchAndInitNewLinks()
