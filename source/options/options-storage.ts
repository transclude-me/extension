import OptionsSync from 'webext-options-sync'

const defaults = {
	renderBlocklist: "gwern.net, wikipedia.org, youtube.com, roam.garden",
}
export const optionsStorage = new OptionsSync({
	defaults: defaults,
	migrations: [
		OptionsSync.migrations.removeUnused,
	],
	logging: true,
})

export const Options = {
	all: async function () {
		return await optionsStorage.getAll() as typeof defaults
	},

	async renderBlocklist() {
		const all = await this.all()
		return all.renderBlocklist.split(",").map(s => s.trim())
	},
}
