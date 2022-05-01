// stolen from https://github.com/modosc/global-jsdom/blob/main/esm/index.mjs
// required to make fragment extraction library work

import {JSDOM} from './jsdom'

const defaultHtml = '<!doctype html><html><head><meta charset="utf-8"></head><body></body></html>'
const KEYS = []

export function globalJsdom(html = defaultHtml, options = {}) {
	// Idempotency
	if (self.navigator
		&& self.navigator.userAgent
		&& self.navigator.userAgent.includes('Node.js')
		&& self.document
		&& typeof self.document.destroy === 'function') {
		return self.document.destroy
	}

	// set a default url if we don't get one - otherwise things explode when we copy localstorage keys
	if (!('url' in options)) {
		// todo maybe replace with blank?
		Object.assign(options, {url: 'http://localhost:3000'})
	}

	// enable pretendToBeVisual by default since react needs
	// window.requestAnimationFrame, see https://github.com/jsdom/jsdom#pretending-to-be-a-visual-browser
	if (!('pretendToBeVisual' in options)) {
		Object.assign(options, {pretendToBeVisual: true})
	}

	const jsdom = new JSDOM(html, options)
	const {window} = jsdom
	const {document} = window

	// generate our list of keys by enumerating document.window - this list may vary
	// based on the jsdom version. filter out internal methods as well as anything
	// that node already defines

	if (KEYS.length === 0) {
		KEYS.push(...Object.getOwnPropertyNames(window).filter((k) => !k.startsWith('_')).filter((k) => !(k in self)))
		// going to add our jsdom instance, see below
		KEYS.push('$jsdom')
	}
	// eslint-disable-next-line no-return-assign
	KEYS.forEach((key) => self[key] = window[key])

	// setup document / window / window.console
	self.document = document
	self.window = window
	window.console = self.console

	// add access to our jsdom instance
	self.$jsdom = jsdom

	const cleanup = () => KEYS.forEach((key) => delete self[key])

	document.destroy = cleanup

	return cleanup
}
