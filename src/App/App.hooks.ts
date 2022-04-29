import { csv } from 'd3-fetch'
import { useEffect, useState } from 'react'

export function useInitData() {
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
        answers
	}
}
