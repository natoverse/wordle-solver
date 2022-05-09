import { DetailsList } from '@fluentui/react'
import { SelectionMode } from '@fluentui/utilities'
import type { FC} from 'react';
import { useCallback, useMemo , useState } from 'react'
import styled from 'styled-components'

export interface WordListProps {
	words: string[]
	onClick?: (word: string) => void
}
export const WordList: FC<WordListProps> = ({ words, onClick }) => {
	const items = useMemo(
		() =>
			words.map(word => ({
				word,
			})),
		[words],
	)
	return (
		<Container>
			<DetailsList
				compact
				isHeaderVisible={false}
				selectionMode={SelectionMode.single}
				items={items}
				columns={[
					{
						key: 'word',
						name: 'Word',
						fieldName: 'word',
						minWidth: 100,
					},
				]}
				onActiveItemChanged={item => onClick?.(item.word)}
			/>
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
