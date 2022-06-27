import * as ReactDOM from 'react-dom'
import {CacheProvider} from '@emotion/react'
import createCache from '@emotion/cache'
import css from 'bundle-text:./sidebar.css'
import {Sidebar} from './sidebar'

/**
 * Required in order to inject emotion styles into shadow root
 */
const emotionCache = (shadow: ShadowRoot) =>
	createCache({
		key: 'transclude-me',
		container: shadow as Node,
	})

export const setupSidebar = () => {
	console.log('loading sidebar')
	const sidebar = document.createElement('transclude-me-sidebar-shadow')
	const shadow = sidebar.attachShadow({mode: 'open'})
	const style = document.createElement('style')
	style.innerText = css

	ReactDOM.render(
		<CacheProvider value={emotionCache(shadow)}>
			<Sidebar/>
		</CacheProvider>
		, shadow)

	shadow.appendChild(style)
	document.body.appendChild(sidebar)
}
