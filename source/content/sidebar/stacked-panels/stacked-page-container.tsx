import {css} from '@emotion/react'
import {LinkRendererStackedPage} from './stacked-page'
import {HTMLAttributes} from 'react'
import {useScroll} from './hooks'

export interface StackedPageContainerProps extends HTMLAttributes<HTMLDivElement> {
	links: string[]
}

const pageWidth = 625
const obstructedPageWidth = 40
const obstructedOffset = 120

export const StackedPageContainer = (props: StackedPageContainerProps) => {
	const [scroll, containerWidth, setRef, containerRef] = useScroll()

	const numberOfPages = props.links.length

	function derivePageState(pageOrder: number, numberOfPages: number) {
		if (pageOrder === 0) {
			return {
				obstructed: false,
				highlighted: false,
				overlay: scroll > pageWidth - obstructedOffset,
				active: true,
			}
		}

		return {
			highlighted: false,
			overlay:
				scroll >
				Math.max(
					pageWidth * (pageOrder - 1) - (obstructedPageWidth * pageOrder - 2),
					0,
				) || scroll < Math.max(0, pageWidth * (pageOrder - 2)),
			obstructed:
				scroll >
				Math.max(
					pageWidth * (pageOrder + 1) -
					obstructedOffset -
					obstructedPageWidth * (pageOrder - 1),
					0,
				) || scroll + containerWidth < pageWidth * pageOrder + obstructedOffset,
			active: pageOrder === numberOfPages - 1,
			pageOrder,
		}
	}

	return <div className={'note-columns-scrolling-container'} ref={setRef}>
		<div
			className="note-columns-container"
			css={css`
					width: ${pageWidth * (numberOfPages)}px;
				`}
		>
			{
				props.links.map((it, idx) =>
					<LinkRendererStackedPage
						key={idx}
						url={it}
						{...derivePageState(idx, numberOfPages)}
					/>)
			}
		</div>
	</div>
}
