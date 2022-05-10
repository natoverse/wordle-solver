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

		const inputs = ['crust', 'croak', 'evade', 'awake', 'stink']

		const results = filter(inputs, guess)

		expect(results).toEqual(['crust', 'croak'])
	})

	test('retain words with an Elsewhere mark', () => {
		const guess = {
			word: 'birds',
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
					mark: Mark.Elsewhere,
				},
				{
					// should result in crust and stink remaining
					letter: 's',
					mark: Mark.Unset,
				},
			],
		}

		const inputs = ['crust', 'croak', 'awake', 'stink']

		const results = filter(inputs, guess)

		expect(results).toEqual(['crust', 'stink'])
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

		const inputs = ['crust', 'croak', 'evade', 'awake', 'stink']

		const results = filter(inputs, guess, previous)

		expect(results).toEqual(['crust', 'croak'])
	})
})
