import { Mark } from '../types'
import { mark } from './mark'

describe('mark words with presence/position indicators', () => {
	test('no matches', () => {
		const result = mark('hello', 'sinus')
		const none = result.letters.every(l => l.mark === Mark.None)
		expect(none).toBe(true)
	})

	test('one confirmed placement', () => {
		const result = mark('marks', 'canon')
		expect(result.letters[0].mark).toBe(Mark.None)
		expect(result.letters[1].mark).toBe(Mark.Confirmed)
		expect(result.letters[2].mark).toBe(Mark.None)
		expect(result.letters[3].mark).toBe(Mark.None)
		expect(result.letters[4].mark).toBe(Mark.None)
	})

	// TODO: this is the correct strict logic, but our second instance is marked as Confirmed
	test.skip('one confirmed placement, second instance marks as None', () => {
		const result = mark('radar', 'canon')
		expect(result.letters[0].mark).toBe(Mark.None)
		expect(result.letters[1].mark).toBe(Mark.Confirmed)
		expect(result.letters[2].mark).toBe(Mark.None)
		expect(result.letters[3].mark).toBe(Mark.None)
		expect(result.letters[4].mark).toBe(Mark.None)
	})
})
