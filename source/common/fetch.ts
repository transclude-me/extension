export async function fetchText(url: string) {
	const response = await fetch(url)
	return response.text()
}
