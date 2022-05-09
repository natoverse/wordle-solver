import { parse } from 'query-string'
export function start(): string {
	const parsed = parse(window.location.search)
	return (parsed.start || '') as string
}
