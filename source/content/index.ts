import {Options} from '../options/options-storage'
import {render} from '../rendering/link-renderer'
import {showTippy} from '../utils/tippy'

const linkSelector = 'a, area'
const linkPreviewClass = 'link-with-preview'

async function initPreview(link: HTMLAnchorElement | HTMLAreaElement) {
	const previewElement = await render(new URL(link.href))
	if (!previewElement) return

	// todo use render result for specific icon on the manner of
	// https://www.gwern.net/Lorem#link-icons
	// https://github.com/gwern/gwern.net/blob/master/css/links.css
	link.classList.add(linkPreviewClass)
	showTippy(link, previewElement)
}

async function initPreviews() {
	Array.from(document.links).forEach(initPreview)
	// todo: this should have 2 modes: on-demand and render everything on load
}

const watchAndInitNewLinks = () => {
	const observer = new MutationObserver(mutations => {
		mutations
			.flatMap(mutations => Array.from(mutations.addedNodes))
			.forEach(checkIfLinkAndInit)
	})

	observer.observe(document.body, {childList: true, subtree: true})
}

const checkIfLinkAndInit = (node: Node) => {
	const isLink = node instanceof HTMLAnchorElement || node instanceof HTMLAreaElement
	if (isLink) {
		void initPreview(node)
	} else if (node instanceof HTMLElement) {
		const links = node.querySelectorAll(linkSelector) as NodeListOf<HTMLAnchorElement | HTMLAreaElement>
		links.forEach(initPreview)
	}
}

const shouldRenderPreviews = async () => {
	// todo maybe per renderer?
	const blockList = await Options.renderBlocklist()
	return blockList.every(domain => !window.location.hostname.endsWith(domain))
}

const loadExtension = async () => {
	if (await shouldRenderPreviews()) {
		void initPreviews()
		watchAndInitNewLinks()
	}
}

void loadExtension()
