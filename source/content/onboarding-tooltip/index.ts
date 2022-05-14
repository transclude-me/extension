import tippy, {Instance as Tippy} from 'tippy.js'
import {isKeyDown} from '../../common/keyboard'

import {IntroShownCount} from './introduction-counter'

const defaultKeyName = 'Alt'

/**
 * Only show first ~few times the user is hovering over things
 */
export async function showOnboardingTooltip(link: HTMLAnchorElement | HTMLAreaElement, root: Element) {
	if (!await IntroShownCount.isOverLimit()) {
		tippy(link, {
			content: `Press "${defaultKeyName}" key while hovering over the link to see the preview`,
			appendTo: () => root,
			onShow() {
				IntroShownCount.increment()
			},
		})
	}
}

/*
 * When the user presses a button whe hovering over the link - show popup
 */
export const buttonPressPlugin = (keyName: string = defaultKeyName) => ({
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

			if (!isKeyDown(keyName)) return false
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
