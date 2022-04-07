import tippy, {Instance as Tippy} from "tippy.js"
import {render} from "./rendering/link-renderer"
import {isKeyDown} from "./common/keyboard"
import {Options} from "./options/options-storage"

async function initPreview(link: HTMLAnchorElement | HTMLAreaElement) {
	const previewElement = await render(new URL(link.href))
	if (!previewElement) return

	// todo use render result for specific icon on the manner of
	// https://www.gwern.net/Lorem#link-icons
	// https://github.com/gwern/gwern.net/blob/master/css/links.css
	link.classList.add("link-with-preview")

	tippy(link, {
		content: previewElement,
		placement: "bottom",
		arrow: true,
		// because otherwise popup may be hidden inside parents
		appendTo: () => document.body,
		animation: 'fade',
		interactive: true,
		theme: 'light',
		maxWidth: '55em',
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

const shouldRenderPreviews = async () => {
	// todo maybe per renderer?
	const blockList = await Options.renderBlocklist()
	return blockList.every(domain => !window.location.hostname.endsWith(domain))
}


const loadExtension = async () => {
	if (await shouldRenderPreviews()) {
		initPreviews()
		watchAndInitNewLinks()
	}
}

loadExtension()
