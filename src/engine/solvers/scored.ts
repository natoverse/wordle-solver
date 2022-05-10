import type { Solver } from '../../types'
import { first } from './first'

/**
 * This is a solver that picks the word with the better letter commoness score
 * the remaining eligible words, and does this until match.
 * @param answers
 * @param solution
 * @param start
 * @returns
 */
export const scored: Solver = (answers, solution, start) => {
	const sorted = [...answers].sort((a, b) => b.score! - a.score!)
	return first(sorted, solution, start)
}
