import {getStyleNodes} from '../style-extractor'
import {lazy} from '../common/lazy'

const docStyleNodes = lazy(async () => {
	const nodes = await getStyleNodes(document)
	/**
	 * Need to clone nodes, as placing them elsewhere in document will cause side-effects on original page otherwise
	 */
	return nodes.map(it => it.cloneNode(true))
})

const workingDocument = document.implementation.createHTMLDocument()

let latestContextElement: HTMLElement | undefined

document.addEventListener('contextmenu', event => {
	latestContextElement = event.target as HTMLElement | undefined
}, true)

/**
 * todo save element link and selector to later be able to refresh it
 */
export async function copyPageFragment() {
	const element = latestContextElement
	if (!element) return

	const container = workingDocument.createElement('div')
	container.append(
		...await docStyleNodes(),
		cloneWithStyle(element),
	)
	ensureCssWillSerialize(container)

	navigator.clipboard.writeText(container.outerHTML)
}

function ensureCssWillSerialize(container: HTMLDivElement) {
	/**
	 * Doing this as a hack to work around
	 * https://stackoverflow.com/questions/71975696/serialized-and-deserialize-html-style-tag-with-css
	 *
	 * It seems that adding style nodes to the document changes them in some fashion,
	 * such that serialization works properly only after that.
	 */
	workingDocument.body.append(container)
	workingDocument.body.removeChild(container)
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
