import {LinkRenderer} from "./link-renderer"
import {css} from "@emotion/react"
import {ReactElement} from "react"

export class WikipediaRenderer implements LinkRenderer {
	/**
	 * todo don't render wikipedia links on wikipedia, as they have native previews
	 * also don't render things on gwern.net in general, which implies a more general pattern of "should render here"
	 */
	canRender(url: URL): boolean {
		return regex.test(url.href)
	}

	async render(url: URL): Promise<ReactElement> {
		return <iframe
			src={rewriteToMobile(url.href)}
			css={css`
			  width: 600px;
			  height: 500px;
			`}
		/>

	}
}

/**
 * If there is no hash in the url - scroll to the first header to display more relevant content
 */
const firstHeaderSuffix = (finalComponent: string) =>
	finalComponent.includes("#") ? "" : "#firstHeading"

function rewriteToMobile(link: string) {
	const match = link.match(regex)
	const alreadyMobile = match.length > 4
	if (alreadyMobile) return link

	const finalComponent = match[3]
	return `https://${match[1]}.m.${match[2]}.org/wiki/${finalComponent}${firstHeaderSuffix(finalComponent)}`
}

const regex = /^https?:\/\/([\w]+)(?:\.m)?\.(wikipedia|wikibooks|wikiversity|wikivoyage|wikisource|wikiquote|wikinews|wikimedia)\.org\/wiki\/(.+)/
