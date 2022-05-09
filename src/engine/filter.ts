import type { MarkedWord } from '../types'
import { validate } from './validate'

/**
 * Filters a list of words to only those that are still possible given a marked up word.
 * @param marked - marked word to check against the list
 * @param list - list of words to filter using the marked word information
 * @param previous - optional list of previous guesses to exclude from the filtered result
 * @returns
 */
export function filter(
	marked: MarkedWord,
	list: string[],
	previous?: MarkedWord[],
): string[] {
	const filtered = list.filter(word => validate(marked, word))
	if (previous) {
		const pSet = new Set(previous.map(p => p.word))
		return filtered.filter(f => !pSet.has(f))
	}
	return filtered
}
