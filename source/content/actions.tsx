import * as ReactDOM from 'react-dom'
import {LinkLike} from 'link-summoner/src/types'
import {saveToInstapaper} from '../instapaper'
import {openUrlInSidebar} from './sidebar/common'
import {ImgHTMLAttributes} from 'react'

interface BaseButtonProps {
	title?: string
	iconUri: string
}

export interface ButtonBuilderProps extends BaseButtonProps {
	action: (link: LinkLike) => void
}

export interface IconButtonProps extends BaseButtonProps, ImgHTMLAttributes<HTMLImageElement> {
}

export const IconButton = (props: IconButtonProps) =>
	<div className={'icon-button-wrapper'}>
		<img src={props.iconUri} {...props}/>
	</div>

export const createIconButton = (props: ButtonBuilderProps) =>
	(link: HTMLAnchorElement | HTMLAreaElement) => {
		const button = document.createElement('div')
		ReactDOM.render(<IconButton {...props} onClick={() => props.action(link)}/>, button)
		return button
	}

export const openInSidebarButton = createIconButton({
	title: 'Open in sidebar',
	iconUri: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' data-icon=\'menu-open\' width=\'16\' height=\'16\' viewBox=\'0 0 16 16\'%3E%3Cpath d=\'M9.99 11.99h-9c-.55 0-1 .45-1 1s.45 1 1 1h9c.55 0 1-.45 1-1s-.45-1-1-1zm0-5h-9c-.55 0-1 .45-1 1s.45 1 1 1h9c.55 0 1-.45 1-1s-.45-1-1-1zm0-5h-9c-.55 0-1 .45-1 1s.45 1 1 1h9c.55 0 1-.45 1-1s-.45-1-1-1zm5.71 5.3l-2-2a1.003 1.003 0 00-1.71.71v4a1.003 1.003 0 001.71.71l2-2c.18-.18.29-.43.29-.71s-.11-.53-.29-.71z\' fill-rule=\'evenodd\'%3E%3C/path%3E%3C/svg%3E',
	action: link => openUrlInSidebar(link.href),
})

export const instapaperActionProps = {
	title: 'Save to Instapaper',
	iconUri: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\'%3E%3Cpath d=\'M6.5 22.551V24h11v-1.449c-2.57-.203-2.831-.473-2.831-2.292h-.001V3.708c0-1.786.263-2.089 2.831-2.292V0H6.5v1.416c2.571.203 2.831.508 2.831 2.292v16.551c0 1.819-.258 2.089-2.831 2.292z\'/%3E%3C/svg%3E',
	action: async (link: LinkLike) => saveToInstapaper({url: link.href}),
}

export const saveToInstapaperButton = createIconButton(instapaperActionProps)
