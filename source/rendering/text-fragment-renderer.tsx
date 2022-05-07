import {ReactElement} from 'react'
import {LinkRenderer} from './link-renderer'
import {backgroundSimulation} from '../content/background-simulation/utils'

export class TextFragmentRenderer implements LinkRenderer {
	async canRender(url: URL): Promise<boolean> {
		return url.href.includes(':~:')
	}

	async render(url: URL): Promise<ReactElement> {
		const elementsByFragment = await backgroundSimulation.execute({
			type: 'get-fragment-elements',
			url: url.href,
		}) as Array<string>

		return <div className={'text-fragment-preview'}>
			{elementsByFragment.map((elements, index) =>
				<div key={index} dangerouslySetInnerHTML={{__html: elements}}/>,
			)}
		</div>
	}
}
