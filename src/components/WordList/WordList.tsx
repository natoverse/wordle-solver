import type { FC} from 'react';
import { useCallback, useState } from 'react'
import styled from 'styled-components'

export interface WordListProps {
	words?: string[]
	onClick?: (word: string) => void
}
export const WordList: FC<WordListProps> = ({ words, onClick }) => {
	const [hovered, setHovered] = useState<string | undefined>()
	const handleHover = useCallback(
		(word?: string) => setHovered(word),
		[setHovered],
	)
	return (
		<Container>
			{words?.map(word => (
				<Word
					key={word}
					hovered={hovered === word}
					onClick={() => onClick?.(word)}
					onMouseEnter={() => handleHover(word)}
					onMouseLeave={() => handleHover()}
				>
					{word}
				</Word>
			))}
		</Container>
	)
}

const Container = styled.div`
	height: 100%;
	width: 100%;
	padding: 0;
`

const Word = styled.div<{ hovered: boolean }>`
	cursor: pointer;
	padding: 2px 2px 2px 8px;
	background: ${({ hovered, theme }) =>
		hovered ? theme.application().accent().hex() : 'none'};
`
