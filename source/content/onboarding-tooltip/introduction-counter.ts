import * as browser from 'webextension-polyfill'

export const IntroShownCount = {
	limit: 5,
	async get(): Promise<number> {
		const result = await browser.storage.local.get('onboardingIntroCount')
		return result.onboardingIntroCount || 0
	},
	async increment(): Promise<void> {
		const count = await this.get()
		await browser.storage.local.set({onboardingIntroCount: count + 1})
	},
	async isOverLimit(): Promise<boolean> {
		const count = await this.get()
		return count >= this.limit
	},
}
