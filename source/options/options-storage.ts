import OptionsSync from 'webext-options-sync'
import {allowSubdomainsFrom, whitelistDomains} from './defaults/iframe'

const defaults = {
	renderBlocklist: 'gwern.net, wikipedia.org, youtube.com, roam.garden',
	iframeDomainWhitelist: whitelistDomains.join(', '),
	iframeSubdomainWhitelist: allowSubdomainsFrom.join(', '),
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
