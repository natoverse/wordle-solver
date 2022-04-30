import type { MarkedWord } from '../types'
import { validate } from './validate'

/**
 * Filters a list of words to only those that are still possible given a marked up word.
 * @param marked
 * @param list
 * @returns
 */
export function filter(marked: MarkedWord, list: string[]): string[] {
	return list.filter(word => validate(marked, word))
}
