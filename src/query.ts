import { parse } from 'query-string'

function query(key: string): string {
	const parsed = parse(window.location.search)
	return (parsed[key] || '') as string
}

export function solution(): string {
	return query('solution')
}

export function start(): string {
	return query('start')
}
