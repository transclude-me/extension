import * as ReactDOM from 'react-dom'
import {LinkLike} from 'link-summoner/src/types'

export interface ButtonProps {
	iconUri: string
	action: (link: LinkLike) => void
	title: string
}

export const createIconButton = ({action, iconUri, title}: ButtonProps) =>
	(link: HTMLAnchorElement | HTMLAreaElement) => {
		const button = document.createElement('div')
		button.classList.add('icon-button-wrapper')
		ReactDOM.render(<img src={iconUri} title={title} onClick={() => action(link)}/>, button)
		return button
	}
