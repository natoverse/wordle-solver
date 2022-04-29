import type { FC } from 'react'
import styled from 'styled-components'

export interface WordListProps {
	words?: string[]
}
export const WordList: FC<WordListProps> = ({ words }) => {
	return (
		<Container>
			{words?.map(word => (
				<div key={word}>{word}</div>
			))}
		</Container>
	)
}

const Container = styled.div`
	height: 100%;
	width: 100%;
`
