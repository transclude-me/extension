import {css} from '@emotion/react'
import {HTMLAttributes, useEffect, useState} from 'react'
import {render} from 'link-summoner'
import {getExtensionRenderers} from '../renderer-configuration'
import {RawElementAdapter} from '../../rendering/components/RawElementAdapter'

export interface StackedPageProps extends HTMLAttributes<HTMLDivElement> {
	obstructed?: boolean
	overlay?: boolean
	highlighted?: boolean
	active?: boolean
	pageOrder?: number
}

export const StackedPage = (props: StackedPageProps) => {

	return <div
		className={noteContainerClassName(props)}
		css={css`
			left: ${40 * (props.pageOrder || 0)}px;
        	right: -585px;
        	position: sticky;
        	background-color: yellow;
		`}
	>
		<div className={'note-content'}>
			{props.children}
		</div>

		<div className="obstructed-note-label">
			<span className={'obstructed-label'}>
				Page
			</span>
		</div>
	</div>
}

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

	return <StackedPage {...props}>
		{content ? <RawElementAdapter elements={[content]}/> : null}
	</StackedPage>
}

const noteContainerClassName = ({overlay, obstructed, highlighted}: StackedPageProps = {}) =>
	`note-container ${overlay ? 'note-container-overlay' : ''} ${
		obstructed ? 'note-container-obstructed' : ''
	} ${highlighted ? 'note-container-highlighted' : ''}`
