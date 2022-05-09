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

	const counts = countLetters(solution)

	const result: MarkedWord = {
		word: guess,
		letters: guessLetters.map((guessLetter, guessIndex) => {
			let mark = Mark.None

			// same letter, same position
			if (guessLetter === solutionLetters[guessIndex]) {
				mark = Mark.Confirmed
				// decrement the counter for this letter in case we find another copy
				decrement(counts, guessLetter)
			} else {
				// find any other position for the letter, unless that letter is already accounted for
				for (
					let solutionIndex = 0;
					solutionIndex < solutionLetters.length;
					solutionIndex++
				) {
					const solutionLetter = solutionLetters[solutionIndex]
					if (solutionIndex !== guessIndex) {
						if (guessLetter === solutionLetter) {
							if (lookup(counts, guessLetter) <= 0) {
								mark = Mark.None
							} else {
								mark = Mark.Elsewhere
								// decrement again
								decrement(counts, guessLetter)
							}

							break
						}
					}
				}
			}

			return {
				letter: guessLetter,
				mark,
			}
		}),
	}

	return result
}

// this counts each unique letter in the word, so we can track whether a letter has been found and still warrants a mark
function countLetters(word: string): Map<string, number> {
	return word.split('').reduce((map, letter) => {
		const count = lookup(map, letter)
		map.set(letter, count + 1)
		return map
	}, new Map<string, number>())
}

// this is a light abstraction over map lookup to default to zero if a letter isn't present
function lookup(counts: Map<string, number>, letter: string): number {
	return counts.get(letter) || 0
}

function decrement(counts: Map<string, number>, letter: string) {
	const prior = counts.get(letter) || 0
	counts.set(letter, prior - 1)
	return counts
}
