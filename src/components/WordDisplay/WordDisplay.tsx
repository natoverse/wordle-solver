import type { FC } from 'react'
import styled from 'styled-components'

import { WordList } from '../WordList/WordList'

export interface WordDisplayProps {
	title: string
	words?: string[]
	onWordClick?: (word: string) => void
}
export const WordDisplay: FC<WordDisplayProps> = ({
	title,
	words,
	onWordClick,
}) => {
	return (
		<Container>
			<Header>
				{title} ({words?.length})
			</Header>
			<List>
				<WordList words={words} onClick={onWordClick} />
			</List>
		</Container>
	)
}

const Container = styled.div`
	height: 600px;
	width: 300px;
	border: 1px solid ${({ theme }) => theme.application().border().hex()};
`

const Header = styled.div`
	margin: 0;
	padding: 4px;
	background: ${({ theme }) => theme.application().lowContrast().hex()};
`
const List = styled.div`
	overflow-y: scroll;
	height: 94%;
	padding: 4px;
`
