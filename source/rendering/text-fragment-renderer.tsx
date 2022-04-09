import {LinkRenderer} from "./link-renderer"

import {ReactElement} from "react"
import {getHighlightedPageElementsFromContentScript} from "../text-fragment"

export class TextFragmentRenderer implements LinkRenderer {
	async canRender(url: URL): Promise<boolean> {
		return url.href.indexOf(":~:") !== -1
	}

	async render(url: URL): Promise<ReactElement> {
		const elementsByFragment = await getHighlightedPageElementsFromContentScript(url.href)

		return <div className={"text-fragment-preview"}>
			{elementsByFragment.map(elements =>
				<div dangerouslySetInnerHTML={{__html: elements}}/>,
			)}
		</div>
	}
}
