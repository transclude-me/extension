import tippy, {Instance as Tippy} from 'tippy.js'
import {isKeyDown} from '../common/keyboard'

// @ts-ignore parcel
import shadowCss from 'bundle-text:../content/shadow.css'

const shadowRoot = initShadowRoot()

export function showTippy(link: HTMLAnchorElement | HTMLAreaElement, previewElement: HTMLElement) {
	tippy(link, {
		content: previewElement,
		plugins: [buttonPressPlugin('Alt')],
		placement: 'bottom',
		arrow: true,
		// in shadow dom to avoid affecting the page styles
		appendTo: () => shadowRoot as unknown as Element,
		animation: 'fade',
		interactive: true,
		theme: 'light',
		maxWidth: '55em',
		delay: [0, 400],
		onShow() {
			// Intentionally empty - monkey patched in the plugin: https://github.com/atomiks/tippyjs/issues/644
		},
	})
}

/*
 * When the user presses a button whe hovering over the link - show popup
 */
const buttonPressPlugin = (keyName: string) => ({
	name: 'showOnButtonPress',
	defaultValue: true,
	fn(instance: Tippy) {
		const originalOnShow = instance.props.onShow
		let forceShow = false

		// Manually override due to https://github.com/atomiks/tippyjs/issues/644
		instance.props.onShow = (instance: Tippy) => {
			if (forceShow) {
				forceShow = false

				originalOnShow(instance)
				return
			}

			if (!isKeyDown('Alt')) return false
		}

		const keyDownHandler = (e: KeyboardEvent) => {
			if (e.key === keyName) {
				forceShow = true
				instance.show()
			}
		}

		return {
			onTrigger(instance: Tippy, event: Event) {
				document.addEventListener('keydown', keyDownHandler)
			},

			onUntrigger(instance: Tippy, event: Event) {
				forceShow = false
				document.removeEventListener('keydown', keyDownHandler)
			},
		}
	},
})

function initShadowRoot() {
	const shadowContainer = document.createElement('div')
	shadowContainer.className = 'transclude-shadow-container'

	const shadowRoot = shadowContainer.attachShadow({mode: 'open'})
	const style = document.createElement('style')
	style.innerText = shadowCss

	shadowRoot.append(style)
	document.body.append(shadowContainer)

	return shadowRoot
}
