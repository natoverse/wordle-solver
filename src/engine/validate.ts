import type { MarkedWord } from '../types'
import { Mark } from '../types'

/**
 * Confirms if a specific word matches the marked criteria.
 * The critiera is:
 * 1) if any letter is Confirmed, only those words with the same letters in the same positions are eligible
 * 2) if any letter is Elsewhere, keep those words
 * 3) if any letter is None, exclude words containing it
 */
export function validate(marked: MarkedWord, word: string): boolean {
	const wordLetters = word.split('')

	// first only allow those words with Confirmed position matches
	let maybe = marked.letters.every((mark, index) => {
		if (mark.mark === Mark.Confirmed) {
			return wordLetters[index] === mark.letter
		}
		// we don't care about any others
		return true
	})

	// still ok? check the Elsewhere letters
	if (maybe) {
		maybe = marked.letters.every((mark, index) => {
			if (mark.mark === Mark.Elsewhere) {
				for (let wordIndex = 0; wordIndex < wordLetters.length; wordIndex++) {
					// ignore the matching index - we already confirmed it is ok
					if (wordIndex !== index) {
						if (wordLetters[wordIndex] === mark.letter) {
							return true
						}
					} else {
						return true
					}
				}
				return false
			}
			return true
		})
	}

	// finally, cull any words that contain None letters
	if (maybe) {
		maybe = marked.letters.every((mark, index) => {
			if (mark.mark === Mark.None) {
				// if any letter matches the none, bail
				for (let wordIndex = 0; wordIndex < wordLetters.length; wordIndex++) {
					if (wordLetters[wordIndex] === mark.letter) {
						return false
					}
				}
			}
			return true
		})
	}

	return maybe
}
