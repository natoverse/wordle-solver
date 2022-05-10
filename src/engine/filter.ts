import type { MarkedWord, RankedWord } from '../types'
import { validate } from './validate'

/**
 * Filters a list of words to only those that are still possible given a marked up word.
 * @param list - list of words to filter using the marked word information
 * @param marked - marked word to use for letter information
 * @param previous - optional list of previous guesses to exclude from the filtered result
 * @returns
 */
export function filter(
	list: RankedWord[],
	marked: MarkedWord,
	previous?: MarkedWord[],
): RankedWord[] {
	const filtered = list.filter(word => validate(word, marked))
	// TODO: if a previous guess had a letter in an Elsewhere position,
	// new guesses should not allow reusing that position
	// TODO: if a previous guess had a None letter, words with that letter should be omitted
	if (previous) {
		const pSet = new Set(previous.map(p => p.word))
		return filtered.filter(word => !pSet.has(word.word))
	}
	return filtered
}
