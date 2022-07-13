import tippy, {Instance as Tippy} from 'tippy.js'

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
export const buttonPressPlugin = (
	shouldShowTippy: (e: MouseEvent | KeyboardEvent) => Boolean = event => event.altKey && !event.shiftKey,
) => ({
	name: 'showOnButtonPress',
	defaultValue: true,
	fn(instance: Tippy) {
		const originalOnShow = instance.props.onShow
		let shouldShow = false

		// Manually override due to https://github.com/atomiks/tippyjs/issues/644
		instance.props.onShow = (instance: Tippy) => {
			if (!shouldShow) return false

			originalOnShow(instance)
		}

		const keyDownHandler = (e: KeyboardEvent) => {
			if (shouldShowTippy(e)) {
				shouldShow = true
				instance.show()
			}
		}

		return {
			onTrigger(_: Tippy, event: MouseEvent) {
				if (shouldShowTippy(event)) {
					shouldShow = true
				}

				document.addEventListener('keydown', keyDownHandler)
			},

			onUntrigger() {
				shouldShow = false
				document.removeEventListener('keydown', keyDownHandler)
			},
		}
	},
})
