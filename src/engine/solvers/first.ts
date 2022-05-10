import type { MarkedWord, Solver } from '../../types'
import { filter } from '../filter'
import { mark } from '../mark'

/**
 * This is a solver that picks the first word from
 * the remaining eligible words, and does this until match.
 * @param answers
 * @param solution
 * @param start
 * @returns
 */
export const first: Solver = (answers, solution, start) => {
	let matched = false
	let guess = start || answers[0]
	let remaining = answers
	const tries: MarkedWord[] = []
	while (!matched) {
		// check the actual guess and set the matched flag
		matched = guess === solution

		// add this to our list of guesses to return
		const marked = mark(guess, solution)
		tries.push(marked)

		// get a new list of allowed guesses, then choose the next guess
		remaining = filter(remaining, marked, tries)
		guess = remaining[0]
	}

	return tries
}
