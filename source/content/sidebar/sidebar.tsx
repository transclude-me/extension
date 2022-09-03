import * as browser from 'webextension-polyfill'

import {slide as Slider} from 'react-burger-menu'
import {useEffect, useRef, useState} from 'react'
import {StackedPageContainer, StackedPageContainerHandle} from './stacked-panels/stacked-page-container'
import {useVariableWidth} from './variable-width'

export const Sidebar = () => {
	// todo show a loading indicator instead of emptiness
	const [isOpen, setOpen] = useState(false)
	const {width, endDrag, startDrag, updateDrag} = useVariableWidth(window.innerWidth * 0.4)
	const containerRef = useRef<StackedPageContainerHandle | null>(null)

	useEffect(() => {
		const messageCallback = (event: any) => {
			console.log('content-script sidebar', event)
			if (event.type === 'add-stack-url') {
				containerRef.current?.addPage(event.url)
				setOpen(true)
			} else if (event.type === 'toggle-sidebar') {
				setOpen(!isOpen)
			}
		}

		const windowMessageCallback = (event: any) => {
			if ('data' in event) {
				// redirect the relevant part of the message to the actual callback
				messageCallback(event.data)
			}
		}

		browser.runtime.onMessage.addListener(messageCallback)
		window.addEventListener('message', windowMessageCallback)

		return () => {
			browser.runtime.onMessage.removeListener(messageCallback)
			window.removeEventListener('message', windowMessageCallback)
		}
	}, [isOpen, setOpen])

	return <Slider
		noTransition
		isOpen={isOpen}
		right
		noOverlay
		customBurgerIcon={false}
		// @ts-ignore
		styles={buildSidebarStyles({
			maxWidth: width,
			// todo this is a hack, because if I keep it auto the close button stays visible
			//  all the time (even when sidebar closed) for some reason
			width: containerRef.current?.pageCount() ? 'auto' : '300px',
		})}
		// This is mainly here to ensure that when menu is closed
		// by internal element logic we're aware and maintain proper state
		onClose={() => setOpen(false)}
		onMouseUp={endDrag}
		onMouseMove={updateDrag}
	>
		<StackedPageContainer ref={containerRef}/>
		<div
			className="sidebar__drag"
			onMouseDown={startDrag}
		/>
	</Slider>
}

const buildSidebarStyles = ({maxWidth, width}: { maxWidth: number; width: string | undefined }) => ({
	bmMenu: {
		overflow: 'hidden',
	},
	bmCross: {
		background: '#bdc3c7',
	},
	bmCrossButton: {
		left: '-2em',
		top: '0.5em',
	},
	bmMenuWrap: {
		zIndex: 99999,
		top: '0px',
		width,
		display: 'flex',
		maxWidth: `${maxWidth}px`,
	},
})
