import {css} from '@emotion/react'
import {HTMLAttributes, useEffect, useState} from 'react'
import {render} from 'link-summoner'
import {getExtensionRenderers} from '../../renderer-configuration'
import {RawElementAdapter} from '../../../rendering/components/RawElementAdapter'
import {openUrlInSidebar} from '../common'
import CloseIcon from 'jsx:../../../assets/icons/close.svg'

export interface StackedPageVisibilityProps {
	obstructed?: boolean
	overlay?: boolean
	highlighted?: boolean
	active?: boolean
}

export interface StackedPageProps extends HTMLAttributes<HTMLDivElement> {
	visibility: StackedPageVisibilityProps
	pageOrder?: number
	pageName?: string
	activate?: () => void
	close?: () => void
}

interface CloseButtonProps {
	onClick: () => void
}

const CloseButton = ({onClick}: CloseButtonProps) => <CloseIcon
	css={css`
	width: 24px;
height: 24px;
cursor: pointer;
filter: invert(50%)
`}
	onClick={onClick}
/>

export const StackedPage = (props: StackedPageProps) =>
	<div
		className={noteContainerClassName(props.visibility)}
		css={css`
			left: ${40 * (props.pageOrder || 0)}px;
        	right: -585px;
        	position: sticky;
		`}
	>
		<div css={{
			position: 'absolute',
			top: '0.5em',
			right: '1.1em',
			zIndex: 1,
			display: 'flex',
		}}>
			{props.close && <CloseButton onClick={props.close}/>}
		</div>

		<div className={'note-content'}>
			{props.children}
		</div>

		<div className="obstructed-note-label">
			<span
				className={'obstructed-label'}
				onClick={props.activate}
			>
				{props.pageName}
			</span>
		</div>
	</div>

export interface LinkRendererStackedPageProps extends StackedPageProps {
	url: string
}

export const LinkRendererStackedPage = (props: LinkRendererStackedPageProps) => {
	const [content, setContent] = useState<HTMLElement>()

	useEffect(() => {
		(async () => {
			const renderedContent = await render(new URL(props.url), await getExtensionRenderers())
			console.log(renderedContent)
			setContent(renderedContent!)
		})()
	}, [])

	return <StackedPage
		{...props}
		pageName={props.url}
		activate={() => openUrlInSidebar(props.url)}
	>
		{content ? <RawElementAdapter elements={[content]}/> : null}
	</StackedPage>
}

const noteContainerClassName = ({overlay, obstructed, highlighted}: StackedPageVisibilityProps = {}) =>
	`note-container ${overlay ? 'note-container-overlay' : ''} ${
		obstructed ? 'note-container-obstructed' : ''
	} ${highlighted ? 'note-container-highlighted' : ''}`
