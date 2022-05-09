import type { FC } from 'react'
import styled from 'styled-components'

import type { MarkedWord } from '../types.js'
import { Mark } from '../types.js'
export interface WordBoxesProps {
	word?: MarkedWord
}

const empty = {
	word: '',
	letters: new Array(5).fill({ letter: '', mark: Mark.Unset }),
}

export const WordBoxes: FC<WordBoxesProps> = ({ word = empty }) => {
	return (
		<Container>
			{word.letters.map((letter, index) => {
				return (
					<Letter key={`${letter}-${index}`} mark={letter.mark}>
						{letter.letter}
					</Letter>
				)
			})}
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	gap: 4px;
`

const Letter = styled.div<{ mark: Mark }>`
	width: 32px;
	height: 32px;
	line-height: 32px;
	text-transform: uppercase;
	font-weight: bold;
	font-size: 1.2em;
	text-align: center;
	vertical-align: middle;
	background: ${({ mark, theme }) => {
		switch (mark) {
			case Mark.Unset:
				return theme.application().faint().hex()
			case Mark.None:
				return '#3a3a3c'
			case Mark.Elsewhere:
				return '#b59f3b'
			case Mark.Confirmed:
				return '#538d4e'
		}
	}};
	border: 1px solid ${({ theme }) => theme.application().lowContrast().hex()};
`
