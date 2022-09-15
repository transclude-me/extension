import OptionsSync from 'webext-options-sync'
import {defaultAllowSubdomainsFrom, defaultWhitelistDomains} from 'link-summoner/src/rendering/iframe-renderer'

const defaults = {
	renderBlocklist: 'gwern.net, youtube.com, roam.garden',
	iframeDomainWhitelist: defaultWhitelistDomains.join(', '),
	iframeSubdomainWhitelist: defaultAllowSubdomainsFrom.join(', '),
}

export const optionsStorage = new OptionsSync({
	defaults,
	migrations: [
		OptionsSync.migrations.removeUnused,
	],
	logging: true,
	storageType: 'local',
})

export const Options = {
	async all() {
		return await optionsStorage.getAll() as typeof defaults
	},

	renderBlocklist: csvSetting('renderBlocklist'),

	iframe: {
		domainWhitelist: csvSetting('iframeDomainWhitelist'),
		subdomainWhitelist: csvSetting('iframeSubdomainWhitelist'),
	},
}

type SettingName = keyof typeof defaults

function csvSetting(name: SettingName) {
	return async () => {
		const all = await Options.all()
		return parseCsv(all[name])
	}
}

const parseCsv = (csv: string) => csv.split(',').map(s => s.trim())
