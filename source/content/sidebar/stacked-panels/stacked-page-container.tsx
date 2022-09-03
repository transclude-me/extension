import {css} from '@emotion/react'
import {LinkRendererStackedPage, StackedPageVisibilityProps} from './stacked-page'
import {forwardRef, HTMLAttributes, MutableRefObject, Ref, useImperativeHandle, useState} from 'react'
import {useScroll} from './hooks'

export interface StackedPageContainerProps extends HTMLAttributes<HTMLDivElement> {
	initialLinks?: string[]
}

export interface StackedPageContainerHandle {
	addPage(newPage: string): void
	closePage(index: number): void
	pageCount(): number
}

const pageWidth = 625
const obstructedPageWidth = 40
const obstructedOffset = 120

const StackedPageContainerInternal = (props: StackedPageContainerProps, ref: Ref<StackedPageContainerHandle>) => {
	const [links, setLinks] = useState(props.initialLinks || [])
	const [scroll, containerWidth, setRef, containerRef] = useScroll()

	const closePage = (index: number) => {
		const newLinks = [...links]
		newLinks.splice(index, 1)
		setLinks(newLinks)
	}

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
		pageCount() {
			return links.length
		},
		closePage,
	}))

	const numberOfPages = links.length

	const derivePageState = (pageOrder: number, numberOfPages: number): StackedPageVisibilityProps =>
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
						key={it}
						url={it}
						pageOrder={idx}
						close={() => closePage(idx)}
						visibility={derivePageState(idx, numberOfPages)}
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
