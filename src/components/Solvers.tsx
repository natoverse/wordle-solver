import { DefaultButton } from '@fluentui/react'
import type { FC } from 'react'
import styled from 'styled-components'

import { solvers } from '../engine/solvers'
import type { Solver } from '../types'

export interface SolversProps {
	onClick?: (solver: Solver) => void
}

export const Solvers: FC<SolversProps> = ({ onClick }) => {
	return (
		<Container>
			{Object.entries(solvers).map(solver => (
				<DefaultButton
					key={`solver-button-${solver[0]}`}
					onClick={() => onClick?.(solver[1])}
				>
					{solver[0]}
				</DefaultButton>
			))}
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
`
