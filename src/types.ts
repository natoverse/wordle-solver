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
