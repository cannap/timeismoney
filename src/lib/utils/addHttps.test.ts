import { describe, it, expect } from 'vitest'
import { addHttps } from './addHttps'

describe('addHttps', () => {
	it('should add https:// to URLs that do not start with it', () => {
		expect(addHttps('example.com')).toBe('https://example.com')
	})

	it('should replace http:// with https://', () => {
		expect(addHttps('http://example.com')).toBe('https://example.com')
	})

	it('should not change the URL if it already starts with https://', () => {
		expect(addHttps('https://example.com')).toBe('https://example.com')
	})
})
