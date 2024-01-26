export function addHttps(url: string) {
	if (url.startsWith('http://')) {
		return 'https://' + url.substring(7)
	} else if (!url.startsWith('https://')) {
		return 'https://' + url
	}
	return url
}
