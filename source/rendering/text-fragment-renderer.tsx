import {LinkRenderer} from 'link-summoner'
import {backgroundSimulation} from '../content/background-simulation/utils'

export class TextFragmentRenderer implements LinkRenderer {
	canRender = async (url: URL) => url.href.includes(':~:')

	async render(url: URL): Promise<HTMLElement> {
		const elementsByFragment = await backgroundSimulation.execute({
			type: 'get-fragment-elements',
			url: url.href,
		}) as Array<string>

		const container = document.createElement('div')
		container.className = 'text-fragment-preview'

		container.append(...elementsByFragment.map(rehydrate))

		return container
	}
}

function rehydrate(elementString: string) {
	const elementContainer = document.createElement('div')
	elementContainer.innerHTML = elementString
	return elementContainer
}
