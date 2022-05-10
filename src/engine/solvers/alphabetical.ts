import type { Solver } from '../../types'
import { first } from './first'

/**
 * This is a solver that picks eligible words alphabetically
 * the remaining eligible words, and does this until match.
 * @param answers
 * @param solution
 * @param start
 * @returns
 */
export const alphabetical: Solver = (answers, solution, start) => {
	const sorted = [...answers].sort((a, b) => a.word.localeCompare(b.word))
	return first(sorted, solution, start)
}
