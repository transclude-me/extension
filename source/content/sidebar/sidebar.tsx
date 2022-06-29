import * as browser from 'webextension-polyfill'

import {slide as Slider} from 'react-burger-menu'
import {useEffect, useState} from 'react'
import {ScrollState, useScroll} from './stacked-panels/hooks'
import {StackedPage} from './stacked-page'
import {css} from '@emotion/react'
// import {useTabLocalState} from '../../core/react'

const obstructedOffset = 120

export const Sidebar = () => {
	// const [isOpen, setOpen] = useTabLocalState('sidebarOpen', false)
	const [isOpen, setOpen] = useState(true)
	// todo show a loading indicator instead of emptiness
	const [url, setUrl] = useState('')

	const [linksToRender, setLinksToRender] =
		useState<Array<string>>([])

	/**
	 [
			'https://en.m.wikipedia.org/wiki/Transclusion',
			'https://manifold.markets/dreev/will-fully-autonomous-level-5-selfd',
			'https://www.gwern.net/Design',
			'https://www.lesswrong.com/posts/2cYebKxNp47PapHTL/cryonics-signup-guide-1-overview/',
		]
	 */

	const pageWidth = 625
	const obstructedPageWidth = 40

	useEffect(() => {
		// todo
		const messageCallback = (event: any) => {
			console.log('content-script sidebar', event)
			if (event.type === 'add-stack-url') {
				setLinksToRender([...linksToRender, event.url])
			} else if (event.type === 'toggle-sidebar') {
				setOpen(!isOpen)
			}
		}

		const windowMessageCallback = (event: any) => {
			// const messageIsFromSidebar = url.startsWith(event.origin)
			// if (messageIsFromSidebar) {
			if ('data' in event) {
				// redirect the relevant part of the message to the actual callback
				messageCallback(event.data)
			}
			// }
		}

		browser.runtime.onMessage.addListener(messageCallback)
		window.addEventListener('message', windowMessageCallback)


		return () => {
			browser.runtime.onMessage.removeListener(messageCallback)
			window.removeEventListener('message', windowMessageCallback)
		}
	}, [isOpen, setOpen, linksToRender])

	const [scroll, containerWidth, setRef, containerRef] = useScroll()


	useEffect(() => {
		const acc: ScrollState = {}

		// if (!containerRef.current) {
		// 	setStackedPageStates(
		// 		stackedPages.reduce((prev, x, i, a) => {
		// 			prev[x.slug] = {
		// 				overlay: true,
		// 				obstructed: false,
		// 				highlighted: false,
		// 				active: i === a.length - 1,
		// 			};
		// 			return prev;
		// 		}, acc)
		// 	);
		// 	return;
		// }

	}, [containerRef, scroll])

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

	const numberOfPages = 4

	return <Slider
		isOpen={isOpen}
		width={450}
		right
		noOverlay
		customBurgerIcon={false}
		styles={styles}
		// This is mainly here to ensure that when menu is closed
		// by internal element logic we're aware and maintain proper state
		onClose={() => setOpen(false)}
	>
		{/* {props.children} */}
		<div className={'note-columns-scrolling-container'} ref={setRef}>
			<div
				className="note-columns-container"
				css={css`
					width: ${pageWidth * (numberOfPages + 1)};
				`}
			>
				{
					linksToRender.map((it, idx) =>
						<StackedPage {...derivePageState(idx, linksToRender.length + 1)}>
							<iframe src={it}/>
						</StackedPage>)
				}
			</div>
		</div>
	</Slider>
}

const styles = {
	bmMenu: {
		overflow: 'hidden',
	},
	bmCross: {
		background: '#bdc3c7',
	},
	bmMenuWrap: {
		zIndex: 99999,
		top: '0px',
		width: '40wv', // todo needs to be variable length and resizeable
	},
}
