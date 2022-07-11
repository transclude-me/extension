import {css} from '@emotion/react'
import {LinkRendererStackedPage} from './stacked-page'
import {forwardRef, HTMLAttributes, MutableRefObject, Ref, useImperativeHandle, useState} from 'react'
import {useScroll} from './hooks'

export interface StackedPageContainerProps extends HTMLAttributes<HTMLDivElement> {
	initialLinks?: string[]
}

export interface StackedPageContainerHandle {
	addPage(newPage: string): void
}

const pageWidth = 625
const obstructedPageWidth = 40
const obstructedOffset = 120

const StackedPageContainerInternal = (props: StackedPageContainerProps, ref: Ref<StackedPageContainerHandle>) => {
	const [links, setLinks] = useState(props.initialLinks || [])
	const [scroll, containerWidth, setRef, containerRef] = useScroll()

	useImperativeHandle(ref, () => ({
		addPage(newPage: string) {
			const existingIdx = links.indexOf(newPage)
			if (existingIdx !== -1) {
				return scrollToPage(containerRef, existingIdx)
				// todo highlight the page for a bit
			}

			const newLinks = [...links, newPage]
			setLinks(newLinks)
			scrollToPage(containerRef, newLinks.length)
		},
	}))

	const numberOfPages = links.length

	const derivePageState = (pageOrder: number, numberOfPages: number) =>
		({
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
		})

	return <div className={'note-columns-scrolling-container'} ref={setRef}>
		<div
			className="note-columns-container"
			css={css`
					width: ${pageWidth * (numberOfPages)}px;
				`}
		>
			{
				links.map((it, idx) =>
					<LinkRendererStackedPage
						key={idx}
						url={it}
						{...derivePageState(idx, numberOfPages)}
					/>)
			}
		</div>
	</div>
}

export const StackedPageContainer = forwardRef<StackedPageContainerHandle, StackedPageContainerProps>(StackedPageContainerInternal)

const scrollToPage = (containerRef: MutableRefObject<HTMLDivElement | null>, pageId: number) =>
	containerRef.current?.scrollTo({
		top: 0,
		left: pageWidth * pageId,
		behavior: 'smooth',
	})
