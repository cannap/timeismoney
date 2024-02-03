/**
 * Adds 'https://' to the beginning of a URL if it is not already present.
 *
 * @param url - The URL to modify.
 * @returns The modified URL with 'https://' added.
 */
export function addHttps(url?: string | null) {
	if (!url) return
	if (url.startsWith('http://')) {
		return 'https://' + url.substring(7)
	} else if (!url.startsWith('https://')) {
		return 'https://' + url
	}

	return url
}
