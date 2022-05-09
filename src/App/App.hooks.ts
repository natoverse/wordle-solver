import { csv } from 'd3-fetch'
import { differenceInDays, startOfYesterday } from 'date-fns'
import { useCallback, useEffect, useState } from 'react'

import { filter } from '../engine/filter'
import { mark } from '../engine/mark'
import { start } from '../query'
import type { MarkedWord } from '../types'
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
 * Compute the index for a solution based on the selected date.
 * @returns
 */
function dateIndex(date: Date) {
	const first = new Date('2021-06-16')
	const diff = differenceInDays(date, first)
	return diff
}
export function useInputs(answers: string[]): {
	solution?: string
	onSolutionChange: (update?: string) => void
	guess?: string
	onGuessChange: (update?: string) => void
	date: Date
	onDateChange: (date: Date) => void
} {
	const [solution, onSolutionChange] = useState<string | undefined>('')
	const [guess, onGuessChange] = useState<string | undefined>(start())

	const [date, onDateChange] = useState<Date>(startOfYesterday())

	// default to yesterday, and set that as the starting solution
	useEffect(() => {
		const index = dateIndex(date)
		onSolutionChange(answers[index])
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
	guess: string | undefined,
	solution: string | undefined,
	guesses: string[],
): {
	remaining: string[]
	tries: MarkedWord[]
	doTest: () => void
} {
	const [remaining, setRemaining] = useState<string[]>([])
	const [tries, setTries] = useState<MarkedWord[]>([])

	useEffect(() => setRemaining(guesses), [guesses])

	const doTest = useCallback(() => {
		if (guess && solution) {
			console.time('mark')
			const marked = mark(guess, solution)
			console.timeEnd('mark')
			setTries(prev => [...prev, marked])
			console.time('filter')
			// this only returns words that are valid guesses given the current input
			const filtered = filter(marked, guesses)
			console.timeEnd('filter')
			// filter once more to eliminate any words that have already been guess
			const tSet = new Set(tries.map(t => t.word))
			const rem = filtered.filter(w => !tSet.has(w))
			setRemaining(rem)
		}
	}, [solution, guess, guesses, tries])

	return {
		doTest,
		tries,
		remaining,
	}
}
