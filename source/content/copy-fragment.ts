import * as browser from 'webextension-polyfill'
import {getStyleNodes} from '../style-extractor'
import {lazy} from '../common/lazy'

const docStyleNodes = lazy(async () => {
	const nodes = await getStyleNodes(document)
	/**
	 * Need to clone nodes, as placing them elsewhere in document will cause side-effects on original page otherwise
	 */
	return nodes.map(it => it.cloneNode(true))
})

const workingDocument = new DOMParser().parseFromString('<html><head></head><body></body></html>', 'text/html')

let latestContextElement: HTMLElement | undefined

document.addEventListener('contextmenu', event => {
	latestContextElement = event.target as HTMLElement | undefined
}, true)

/**
 * a hack to work around facing https://stackoverflow.com/questions/71975696/serialized-and-deserialize-html-style-tag-with-css
 * tries to replace &gt; with > only in CSS nodes
 *
 * implementation wise it's doing the whole splitting and joining because:
 * - need to make sure to do replacements only in style nodes
 * - can't do overlapping regex replaces
 */
function fixCssSerialization(htmlStr: string) {
	const replace = (str: string) => str.replaceAll('&gt;', '>')

	const styleParts = htmlStr.split(/(<style)/)
		.flatMap(it => it.split(/(<\/style>)/))

	for (let i = 1; i < styleParts.length; i++) {
		if (styleParts[i - 1] === '<style') {
			styleParts[i] = replace(styleParts[i])
		}
	}

	return styleParts.map(replace).join('')
}

export const setupEventHandlers = () => {
	browser.runtime.onMessage.addListener(async message => {
		if (message.type === 'copy-page-fragment') {
			const element = latestContextElement
			if (!element) return

			const container = workingDocument.createElement('div')

			console.log('a', await docStyleNodes())

			container.append(
				...await docStyleNodes(),
				cloneWithStyle(element),
			)


			workingDocument.body.append(container)

			// const html = fixCssSerialization(container.outerHTML)
			const html = container.outerHTML
			console.log(html)

			navigator.clipboard.writeText(html)

			workingDocument.removeChild(container)
		}
	})

	/**
	 * save element link and selector to later be able to refresh it
	 */
}

function cloneWithStyle(element: HTMLElement) {
	const clone = element.cloneNode(true) as HTMLElement
	if (!clone.style) {
		clone.setAttribute('style', '')
	}

	const dimensions = element.getBoundingClientRect()
	clone.style.width = dimensions.width.toString() + 'px'
	// not sure about this one, verify it works as expected
	clone.style.height = '100%'
	clone.style.margin = 'auto'
	return clone
}
