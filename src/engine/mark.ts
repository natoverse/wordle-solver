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

	const result: MarkedWord = guessLetters.map((guessLetter, guessIndex) => {
		let mark = Mark.None

		// same letter, same position
		if (guessLetter === solutionLetters[guessIndex]) {
			mark = Mark.Confirmed
		} else {
			// find any other position for the letter
			// TODO: in the actual wordle implementation, once a letter is matched,
			// if it is guessed elsewhere it will be marked as wrong, not elsewhere
			for (
				let solutionIndex = 0;
				solutionIndex < solutionLetters.length;
				solutionIndex++
			) {
				if (solutionIndex !== guessIndex) {
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
	})

	return result
}
