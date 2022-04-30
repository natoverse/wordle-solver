import type { FC } from 'react'
import styled from 'styled-components'

export const Header: FC = () => <Container>Wordle Solver!</Container>

const Container = styled.h1`
margin: 0;
padding: 10px;
	width: 100%;
	height: 40px;
	color: ${({ theme }) => theme.application().highContrast().hex()};
	text-shadow: ${({ theme }) => {
		const shadow = theme.application().lowContrast().hex()
		return `1px 0 0 ${shadow},0 1px 0 ${shadow},-1px 0 0 ${shadow},0 -1px 0 ${shadow};`
	}} 
	background: ${({ theme }) => theme.application().accent().hex()};
	border-bottom: 1px solid ${({ theme }) =>
		theme.application().lowContrast().hex()};
`
