import type { Solver } from '../../types'
import { first } from './first'

/**
 * This is a solver that picks the most popular word from
 * the remaining eligible words, and does this until match.
 * @param answers
 * @param solution
 * @param start
 * @returns
 */
export const popular: Solver = (answers, solution, start) => {
	const sorted = [...answers].sort((a, b) => b.rank! - a.rank!)
	return first(sorted, solution, start)
}
