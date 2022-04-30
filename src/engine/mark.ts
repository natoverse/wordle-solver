import type { MarkedWord } from '../types'
import { Mark } from '../types'

/**
 * This function marks a word with information about each letter's presence in the final answer.
 * @param guess
 * @param solution
 * @returns
 */
export function mark(guess: string, solution: string): MarkedWord {
	const guessLetters = guess.split('')
	const solutionLetters = solution.split('')

	const result: MarkedWord = guessLetters.map(
		(guessLetter, guessolutionIndexndex) => {
			let mark = Mark.None

			// same letter, same posolutionIndextion
			if (guessLetter === solutionLetters[guessolutionIndexndex]) {
				mark = Mark.Confirmed
			} else {
				// find any other posolutionIndextion for the letter
				for (
					let solutionIndex = 0;
					solutionIndex < solutionLetters.length;
					solutionIndex++
				) {
					if (solutionIndex !== guessolutionIndexndex) {
						if (guessLetter === solutionLetters[solutionIndex]) {
							mark = Mark.Elsewhere
							break
						}
					}
				}
			}

			return {
				letter: guessLetter,
				mark,
			}
		},
	)

	return result
}
