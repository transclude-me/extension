export const isKeyDown = (() => {
	const state = {}

	window.addEventListener('keyup', (e) => state[e.key] = false)
	window.addEventListener('keydown', (e) => state[e.key] = true)

	return (key: string) => state.hasOwnProperty(key) && state[key] || false
})()
