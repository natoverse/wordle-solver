import type { IColumn } from '@fluentui/react'
import { DetailsList } from '@fluentui/react'
import { SelectionMode } from '@fluentui/utilities'
import type { FC } from 'react'
import { useCallback } from 'react'

import type { RankedWord } from '../types'

export interface WordListProps {
	words: RankedWord[]
	onClick?: (word: string) => void
}
export const WordList: FC<WordListProps> = ({ words, onClick }) => {
	const handleRowClick = useCallback(
		(item: any) => onClick?.(item.word),
		[onClick],
	)
	return (
		<DetailsList
			compact
			isHeaderVisible={false}
			selectionMode={SelectionMode.single}
			items={words}
			columns={columns}
			onActiveItemChanged={handleRowClick}
		/>
	)
}

const columns: IColumn[] = [
	{
		key: 'word',
		name: 'Word',
		fieldName: 'word',
		minWidth: 80,
	},
	{
		key: 'rank',
		name: 'Rank',
		fieldName: 'rank',
		minWidth: 50,
	},
]
