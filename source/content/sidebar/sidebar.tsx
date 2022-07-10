import * as browser from 'webextension-polyfill'

import {slide as Slider} from 'react-burger-menu'
import {useEffect, useState} from 'react'
import {StackedPageContainer} from './stacked-panels/stacked-page-container'
import {useVariableWidth} from './variable-width'

export const Sidebar = () => {
	// todo show a loading indicator instead of emptiness
	const [isOpen, setOpen] = useState(false)
	const {width, endDrag, startDrag, updateDrag} = useVariableWidth(window.innerWidth * 0.4)

	const [linksToRender, setLinksToRender] =
		useState<Array<string>>([])

	useEffect(() => {
		const messageCallback = (event: any) => {
			console.log('content-script sidebar', event)
			if (event.type === 'add-stack-url') {
				setLinksToRender([...linksToRender, event.url])
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
	}, [isOpen, setOpen, linksToRender])

	return <Slider
		noTransition
		isOpen={isOpen}
		width={450}
		right
		noOverlay
		customBurgerIcon={false}
		// @ts-ignore
		styles={buildSidebarStyles({maxWidth: width})}
		// This is mainly here to ensure that when menu is closed
		// by internal element logic we're aware and maintain proper state
		onClose={() => setOpen(false)}
		onMouseUp={endDrag}
		onMouseMove={updateDrag}
	>
		<StackedPageContainer links={linksToRender}/>
		<div
			className="sidebar__drag"
			onMouseDown={startDrag}
		/>
	</Slider>
}

const buildSidebarStyles = ({maxWidth}: { maxWidth: number }) => ({
	bmMenu: {
		overflow: 'hidden',
	},
	bmCross: {
		background: '#bdc3c7',
	},
	bmMenuWrap: {
		zIndex: 99999,
		top: '0px',
		width: 'fit-content',
		display: 'flex',
		maxWidth: `${maxWidth}px`,
	},
})
