import { useCallback, useState } from 'react'

import { solvers } from '../../engine/solvers'
import type { RankedWord } from '../../types'

const WORDS = 50
const ITERATIONS = 10

export function useComparison(
	guesses: RankedWord[],
	answers: RankedWord[],
	start?: string,
): {
	results: any[]
	doComparison: () => void
	doReset: () => void
} {
	console.log(start)
	const [results, setResults] = useState<any>([])
	const doComparison = useCallback(() => {
		const words = answers.slice(0, WORDS)

		const newResults: any[] = []

		words.forEach(word => {
			// create a new row for each word, with columns for each solver
			const row = new Array(Object.keys(solvers).length + 1).fill(word.word)

			Object.entries(solvers).forEach(([name, solver], solverIndex) => {
				if (name === 'Random') {
					// x iterations per random solver to get an average
					let sum = 0
					for (let i = 0; i < ITERATIONS; i++) {
						sum += solver(guesses, word.word, start).length
					}
					const random = sum / ITERATIONS
					row[solverIndex + 1] = random
				} else {
					const count = solver(guesses, word.word, start).length
					row[solverIndex + 1] = count
				}
			})

			newResults.push(row)
		})

		// average up the results for each solver
		// TODO: this is super messy, clean it up!
		const sumRow = newResults.reduce((acc, cur) => {
			cur.forEach((column: any, idx: number) => {
				if (idx === 0) {
					acc[idx] = 'average'
				} else {
					acc[idx] = acc[idx] + column
				}
			})
			return acc
		}, new Array(Object.keys(solvers).length + 1).fill(0))

		const meanRow = sumRow.map((cell: any, idx: number) => {
			return idx === 0 ? cell : Math.round((cell / WORDS) * 100) / 100
		})

		newResults.splice(0, 0, meanRow)
		setResults(newResults)
	}, [guesses, answers, setResults, start])

	const doReset = useCallback(() => setResults([]), [setResults])
	return {
		results,
		doComparison,
		doReset,
	}
}
