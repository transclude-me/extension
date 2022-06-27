import {css} from '@emotion/react'

export interface StackedPageProps {
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
			<iframe src={'https://en.m.wikipedia.org/wiki/Transclusion'}></iframe>
		</div>

		<div className="obstructed-note-label">
			<span className={"obstructed-label"}>
				Page
			</span>
		</div>
	</div>
}

const noteContainerClassName = ({overlay, obstructed, highlighted}: StackedPageProps = {}) =>
	`note-container ${overlay ? 'note-container-overlay' : ''} ${
		obstructed ? 'note-container-obstructed' : ''
	} ${highlighted ? 'note-container-highlighted' : ''}`
