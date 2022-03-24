import tippy from "tippy.js"
import {render} from "./rendering/link-renderer"

async function initPreview(link: HTMLAnchorElement | HTMLAreaElement) {
	const previewElement = await render(new URL(link.href))
	if (!previewElement) return

	tippy(link, {
		content: previewElement,
		arrow: true,
		animation: 'fade',
		interactive: true,
		theme: 'light',
	})
}

async function initPreviews() {
	Array.from(document.links).forEach(initPreview)
	//todo: this should have 2 modes: on-demand and render everything on load
}

initPreviews()
