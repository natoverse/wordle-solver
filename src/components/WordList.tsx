import type { IColumn } from '@fluentui/react'
import { DetailsList } from '@fluentui/react'
import { SelectionMode } from '@fluentui/utilities'
import type { FC } from 'react'
import { useCallback, useMemo } from 'react'

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

	const handleRowClick = useCallback(
		(item: any) => onClick?.(item.word),
		[onClick],
	)
	return (
		<DetailsList
			compact
			isHeaderVisible={false}
			selectionMode={SelectionMode.single}
			items={items}
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
		minWidth: 100,
	},
]
