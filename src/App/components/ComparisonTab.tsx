import { DefaultButton, PrimaryButton } from '@fluentui/react'
import type { FC } from 'react'
import styled from 'styled-components'

import { solvers } from '../../engine/solvers'
import type { RankedWord } from '../../types'
import { useComparison } from './ComparisonTab.hooks'

export interface ComparisonTabProps {
	start?: string
	guesses: RankedWord[]
	answers: RankedWord[]
}
export const ComparisonTab: FC<ComparisonTabProps> = ({
	guesses,
	answers,
	start,
}) => {
	const { results, doComparison, doReset } = useComparison(
		guesses,
		answers,
		start,
	)

	return (
		<Container>
			<Table>
				<thead>
					<Tr>
						<Th>Word</Th>
						{Object.keys(solvers).map(key => (
							<Th key={`th-td-${key}`}>{key}</Th>
						))}
					</Tr>
				</thead>
				<tbody>
					<Tr>
						{results.length > 0
							? results[0].map((cell: any, idx: number) => (
									<Sum
										key={`sum-cell-${idx}`}
										style={{ textAlign: idx > 0 ? 'right' : 'left' }}
									>
										{cell}
									</Sum>
							  ))
							: null}
					</Tr>
					{results.slice(1).map((row: any, ridx: number) => {
						return (
							<Tr key={`row-${row[0]}`}>
								{row.map((cell: any, idx: number) => (
									<Td
										key={`row-${ridx}-cell${idx}`}
										style={{ textAlign: idx > 0 ? 'right' : 'left' }}
									>
										{cell}
									</Td>
								))}
							</Tr>
						)
					})}
				</tbody>
			</Table>
			<Buttons>
				<PrimaryButton onClick={doComparison}>Run!</PrimaryButton>
				<DefaultButton onClick={doReset}>Clear</DefaultButton>
			</Buttons>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	gap: 10px;
`

const Buttons = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`

const Table = styled.table`
	border-collapse: collapse;
	min-height: 200px;
	margin-bottom: 20px;
`

const Tr = styled.tr`
	width: 600px;
`

const Sum = styled.td`
	border-bottom: 1px solid ${({ theme }) => theme.palette.neutralLight};
	color: ${({ theme }) => theme.palette.themePrimary};
`
const Th = styled.th`
	width: 100px;
	padding: 4px;
	background: ${({ theme }) => theme.palette.neutralLight};
	height: 26px;
	border-radius: 2px;
`

const Td = styled.td`
	width: 100px;
	padding: 4px;
`
