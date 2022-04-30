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

export type MarkedWord = MarkedLetter[]
