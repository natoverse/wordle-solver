import { csv } from 'd3-fetch'
import { differenceInDays, startOfYesterday } from 'date-fns'
import { useCallback, useEffect, useState } from 'react'

import { filter } from '../engine/filter'
import { mark } from '../engine/mark'
import { solution as solutionParam, start } from '../query'
import type { MarkedWord, Solver } from '../types'

/**
 * Loads all required word data files.
 * @returns
 */
export function useData(): {
	guesses: string[]
	answers: string[]
} {
	const [guesses, setGuesses] = useState<string[]>([])
	const [answers, setAnswers] = useState<string[]>([])

	useEffect(() => {
		const f = async () => {
			const g = await csv('guesses.csv')
			setGuesses(g.columns)

			const a = await csv('answers.csv')
			setAnswers(a.columns)
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
export function useInputs(answers: string[]): {
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
		const def = solutionParam()
		const first = new Date('2021-06-16')
		const index = differenceInDays(date, first)
		onSolutionChange(def || answers[index])
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
	answers: string[],
	guesses: string[],
): {
	remaining: string[]
	tries: MarkedWord[]
	doTest: () => void
	doSolver: (solver: Solver) => void
} {
	const [remaining, setRemaining] = useState<string[]>([])
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
			const results = solver(answers, solution, guess)
			setTries(results)
		},
		[answers, solution, guess, setTries],
	)

	return {
		doTest,
		tries,
		remaining,
		doSolver,
	}
}
