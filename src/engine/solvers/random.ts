import type { MarkedWord, RankedWord, Solver } from '../../types'
import { filter } from '../filter'
import { mark } from '../mark'

/**
 * This is a solver that picks a random word from
 * the remaining eligible words, and does this until match.
 * @param answers
 * @param solution
 * @param start
 * @returns
 */
export const random: Solver = (answers, solution, start) => {
	let matched = false
	let guess = start || randomWord(answers).word
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
		guess = randomWord(remaining)?.word
	}

	return tries
}

function randomWord(list: RankedWord[]): RankedWord {
	const index = Math.floor(Math.random() * (list.length - 1))
	return list[index]
}
