import tippy from 'tippy.js'
import {Options} from '../options/options-storage'
// @ts-ignore parcel
import shadowCss from 'bundle-text:./shadow.css'
import {isKeyDown} from '../common/keyboard'
import {render} from '../rendering/link-renderer'

const shadowRoot = initShadowRoot()

async function initPreview(link: HTMLAnchorElement | HTMLAreaElement) {
	const previewElement = await render(new URL(link.href))
	if (!previewElement) return

	// todo use render result for specific icon on the manner of
	// https://www.gwern.net/Lorem#link-icons
	// https://github.com/gwern/gwern.net/blob/master/css/links.css
	link.classList.add('link-with-preview')

	tippy(link, {
		content: previewElement,
		placement: 'bottom',
		arrow: true,
		// in shadow dom to avoid affecting the page styles
		appendTo: () => shadowRoot as unknown as Element,
		animation: 'fade',
		interactive: true,
		theme: 'light',
		maxWidth: '55em',
		delay: [0, 400],
		onShow() {
			if (!isKeyDown('Alt')) return false
		},
	})
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
		const links = node.querySelectorAll('a, area') as NodeListOf<HTMLAnchorElement | HTMLAreaElement>
		links.forEach(initPreview)
	}
}

const shouldRenderPreviews = async () => {
	// todo maybe per renderer?
	const blockList = await Options.renderBlocklist()
	return blockList.every(domain => !window.location.hostname.endsWith(domain))
}

function initShadowRoot() {
	const shadowContainer = document.createElement('div')
	shadowContainer.className = 'transclude-shadow-container'

	const shadowRoot = shadowContainer.attachShadow({mode: 'open'})
	const style = document.createElement('style')
	style.innerText = shadowCss

	shadowRoot.append(style)
	document.body.append(shadowContainer)

	return shadowRoot
}

const loadExtension = async () => {
	if (await shouldRenderPreviews()) {
		void initPreviews()
		watchAndInitNewLinks()
	}
}

void loadExtension()
