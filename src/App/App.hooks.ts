import { csv } from 'd3-fetch'
import { differenceInDays, startOfYesterday } from 'date-fns'
import { useCallback, useEffect, useState } from 'react'

import { filter } from '../engine/filter'
import { mark } from '../engine/mark'
import { solution as solutionParam, start } from '../query'
import type { MarkedWord, RankedWord, Solver } from '../types'

/**
 * Loads all required word data files.
 * @returns
 */
export function useData(): {
	guesses: RankedWord[]
	answers: RankedWord[]
} {
	const [guesses, setGuesses] = useState<RankedWord[]>([])
	const [answers, setAnswers] = useState<RankedWord[]>([])

	useEffect(() => {
		const f = async () => {
			const g = await csv('guesses-ranked.csv', (d: any) => ({
				...d,
				rank: +d.rank,
				score: +d.score,
			}))
			setGuesses(g as RankedWord[])

			const aRaw = await csv('answers.csv')
			const aRanked = aRaw.columns.map(word => ({ word, rank: 1, score: 1 }))
			setAnswers(aRanked)
		}
		f()
	}, [])
	return {
		guesses,
		answers,
	}
}

/**
 * Use the user inputs for the solution to try against and the current guess
 * @param answers
 * @returns
 */
export function useInputs(answers: RankedWord[]): {
	solution: string
	onSolutionChange: (update: string) => void
	guess: string
	onGuessChange: (update: string) => void
	date: Date
	onDateChange: (date: Date) => void
} {
	const [solution, onSolutionChange] = useState<string>('')
	const [guess, onGuessChange] = useState<string>(start())

	const [date, onDateChange] = useState<Date>(startOfYesterday())

	// default to yesterday, and set that as the starting solution
	// unless a word has been specified on the url
	useEffect(() => {
		if (answers.length > 0) {
			const def = solutionParam()
			const first = new Date('2021-06-16')
			const index = differenceInDays(date, first)
			onSolutionChange(def || answers[index].word)
		}
	}, [answers, date, onSolutionChange])

	return {
		solution,
		onSolutionChange,
		guess,
		onGuessChange,
		date,
		onDateChange,
	}
}

export function useMarkedResults(
	guess: string,
	solution: string,
	answers: RankedWord[],
	guesses: RankedWord[],
): {
	remaining: RankedWord[]
	tries: MarkedWord[]
	doTest: () => void
	doSolver: (solver: Solver) => void
} {
	const [remaining, setRemaining] = useState<RankedWord[]>([])
	const [tries, setTries] = useState<MarkedWord[]>([])

	useEffect(() => setRemaining(guesses), [guesses])

	const doTest = useCallback(() => {
		if (guess && solution) {
			const marked = mark(guess, solution)
			setTries(prev => [...prev, marked])
			// this only returns words that are valid guesses given the current input
			const filtered = filter(guesses, marked, tries)
			setRemaining(filtered)
		}
	}, [solution, guess, guesses, tries])

	const doSolver = useCallback(
		(solver: Solver) => {
			const results = solver(guesses, solution, guess)
			setTries(results)
		},
		[guesses, solution, guess, setTries],
	)

	return {
		doTest,
		tries,
		remaining,
		doSolver,
	}
}
