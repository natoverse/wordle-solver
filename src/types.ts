export interface RankedWord {
	word: string
	rank?: number
	score?: number
}
export enum Mark {
	Unset,
	None,
	Elsewhere,
	Confirmed,
}
export interface MarkedLetter {
	letter: string
	mark: Mark
}

export interface MarkedWord {
	word: string
	letters: MarkedLetter[]
}

export type Solver = (
	answers: RankedWord[],
	solution: string,
	start: string,
) => MarkedWord[]
