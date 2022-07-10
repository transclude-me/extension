import * as browser from 'webextension-polyfill'

import {slide as Slider} from 'react-burger-menu'
import {useEffect, useState} from 'react'
import {StackedPageContainer} from './stacked-panels/stacked-page-container'
// import {useTabLocalState} from '../../core/react'

export const Sidebar = () => {
	// const [isOpen, setOpen] = useTabLocalState('sidebarOpen', false)
	// todo show a loading indicator instead of emptiness
	const [isOpen, setOpen] = useState(false)

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
		isOpen={isOpen}
		width={450}
		right
		noOverlay
		customBurgerIcon={false}
		// @ts-ignore
		styles={styles}
		// This is mainly here to ensure that when menu is closed
		// by internal element logic we're aware and maintain proper state
		onClose={() => setOpen(false)}
	>
		<StackedPageContainer links={linksToRender}/>
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
		width: 'fit-content',
		maxWidth: '40vw', // todo needs to be variable length and resizeable
	},
}
