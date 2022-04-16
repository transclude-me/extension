import {ReactElement} from 'react'
import {getHighlightedPageElementsFromContentScript} from '../text-fragment'
import {LinkRenderer} from './link-renderer'

export class TextFragmentRenderer implements LinkRenderer {
	async canRender(url: URL): Promise<boolean> {
		return url.href.includes(':~:')
	}

	async render(url: URL): Promise<ReactElement> {
		const elementsByFragment = await getHighlightedPageElementsFromContentScript(url.href)

		return <div className={'text-fragment-preview'}>
			{elementsByFragment.map((elements, index) =>
				<div key={index} dangerouslySetInnerHTML={{__html: elements}}/>,
			)}
		</div>
	}
}
