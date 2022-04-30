import type { FC } from 'react'
import styled from 'styled-components'

export interface WordListProps {
	words?: string[]
	onClick?: (word: string) => void
}
export const WordList: FC<WordListProps> = ({ words, onClick }) => {
	return (
		<Container>
			{words?.map(word => (
				<Word key={word} onClick={() => onClick?.(word)}>
					{word}
				</Word>
			))}
		</Container>
	)
}

const Container = styled.div`
	height: 100%;
	width: 100%;
`

const Word = styled.div``
