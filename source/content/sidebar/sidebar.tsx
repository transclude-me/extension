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

	const pageWidth = 625
	const obstructedPageWidth = 40

	useEffect(() => {
		// todo
		const messageCallback = (event: any) => {
			console.log('content-script container ev', event)
			if (event.type === 'update-panel-url') {
				setUrl(event.url)
			} else if (event.type === 'toggle-sidebar') {
				setOpen(!isOpen)
			}
		}

		browser.runtime.onMessage.addListener(messageCallback)

		return () => browser.runtime.onMessage.removeListener(messageCallback)
	}, [isOpen, setOpen])

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
				<StackedPage {...derivePageState(0, numberOfPages)}/>
				<StackedPage {...derivePageState(1, numberOfPages)}/>
				<StackedPage {...derivePageState(2, numberOfPages)}/>
				<StackedPage {...derivePageState(3, numberOfPages)}/>
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
		width: '100vw',
	},
}
