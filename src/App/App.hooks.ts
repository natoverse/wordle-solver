import { csv } from 'd3-fetch'
import { useCallback, useEffect, useState } from 'react'
import { differenceInDays } from 'date-fns'
import { filter } from '../engine/filter'
import { mark } from '../engine/mark'
import type { MarkedWord } from '../types'
export function useData(): {
	guesses: string[]
	answers: string[],
	yesterday: string,
	today: string
} {
	const [guesses, setGuesses] = useState<string[]>([])
	const [answers, setAnswers] = useState<string[]>([])
	const [yesterday, setYesterday] = useState<string>('')
	const [today, setToday] = useState<string>('')
	useEffect(() => {
		const f = async () => {
			const g = await csv('guesses.csv')
			setGuesses(g.columns)

			const a = await csv('answers.csv')
			setAnswers(a.columns)

			const tidx = todaysIndex()
			
			const y = a.columns[tidx - 1]
			const t = a.columns[tidx]

			setYesterday(y)
			setToday(t)
		}
		f()
	}, [])
	return {
		guesses,
		answers,
		yesterday,
		today
	}
}

function todaysIndex() {
	const first = new Date('2021-06-16')
	const today = new Date()
	const diff = differenceInDays(today, first)
	return diff - 1 // zero-based index
}
export function useInputs(yesterday: string): {
	solution?: string
	onSolutionChange: (update?: string) => void
	guess?: string
	onGuessChange: (update?: string) => void
} {
	const [solution, onSolutionChange] = useState<string | undefined>('')
	const [guess, onGuessChange] = useState<string | undefined>('')

	useEffect(() => {
		onSolutionChange(yesterday)
	}, [yesterday, onSolutionChange])
	
	return {
		solution,
		onSolutionChange,
		guess,
		onGuessChange,
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
			const m = mark(guess, solution)
			console.timeEnd('mark')
			setTries(prev => [...prev, m])
			console.time('filter')
			const r = filter(m, guesses)
			console.timeEnd('filter')
			setRemaining(r)
		}
	}, [solution, guess, guesses])

	return {
		doTest,
		tries,
		remaining,
	}
}
