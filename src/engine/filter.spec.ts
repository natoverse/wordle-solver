import { Mark } from '../types'
import { filter } from './filter'

describe('filter based on word information matches', () => {
	test('only words with at least one Confirmed letter', () => {
		const guess = {
			word: 'crust',
			letters: [
				{
					letter: 'c',
					mark: Mark.Confirmed,
				},
				{
					letter: 'r',
					mark: Mark.Unset,
				},
				{
					letter: 'u',
					mark: Mark.Unset,
				},
				{
					letter: 's',
					mark: Mark.Unset,
				},
				{
					letter: 't',
					mark: Mark.Unset,
				},
			],
		}

		const inputs = [
			{ word: 'crust', rank: 1 },
			{ word: 'croak', rank: 1 },
			{ word: 'evade', rank: 1 },
			{ word: 'awake', rank: 1 },
			{ word: 'stink', rank: 1 },
		]

		const results = filter(inputs, guess)

		expect(results).toEqual([
			{ word: 'crust', rank: 1 },
			{ word: 'croak', rank: 1 },
		])
	})

	test('retain words with an Elsewhere mark', () => {
		const guess = {
			word: 'bards',
			letters: [
				{
					letter: 'b',
					mark: Mark.Unset,
				},
				{
					// should result in croak and awake leaving
					letter: 'a',
					mark: Mark.None,
				},
				{
					// should result in crust remaining
					letter: 'r',
					mark: Mark.Elsewhere,
				},
				{
					letter: 'd',
					mark: Mark.Unset,
				},
				{
					// should result in crust and stirk remaining
					letter: 's',
					mark: Mark.Elsewhere,
				},
			],
		}

		const inputs = [
			{ word: 'crust', rank: 1 },
			{ word: 'croak', rank: 1 },
			{ word: 'awake', rank: 1 },
			{ word: 'stirk', rank: 1 },
		]

		const results = filter(inputs, guess)

		expect(results).toEqual([
			{ word: 'crust', rank: 1 },
			{ word: 'stirk', rank: 1 },
		])
	})
	test.skip('use information from previous tries to exclude additional words', () => {
		const guess = {
			word: 'crust',
			letters: [
				{
					letter: 'c',
					mark: Mark.Unset,
				},
				{
					letter: 'r',
					mark: Mark.Unset,
				},
				{
					letter: 'u',
					mark: Mark.Unset,
				},
				{
					letter: 's',
					mark: Mark.Elsewhere,
				},
				{
					letter: 't',
					mark: Mark.Unset,
				},
			],
		}

		const previous = [
			{
				word: 'brake',
				letters: [
					{
						letter: 'b',
						mark: Mark.Unset,
					},
					{
						letter: 'r',
						mark: Mark.Unset,
					},
					{
						letter: 'a',
						mark: Mark.Unset,
					},
					{
						// should result in awake and stink filtering out
						letter: 'k',
						mark: Mark.None,
					},
					{
						letter: 'e',
						mark: Mark.Unset,
					},
				],
			},
		]

		const inputs = [
			{ word: 'crust', rank: 1 },
			{ word: 'croak', rank: 1 },
			{ word: 'evade', rank: 1 },
			{ word: 'awake', rank: 1 },
			{ word: 'stink', rank: 1 },
		]

		const results = filter(inputs, guess, previous)

		expect(results).toEqual([
			{ word: 'crust', rank: 1 },
			{ word: 'croak', rank: 1 },
		])
	})
})
