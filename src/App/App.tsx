import { Spinner } from '@fluentui/react'
import type { FC } from 'react'
import { memo, Suspense } from 'react'
import { RecoilRoot } from 'recoil'
import styled from 'styled-components'

import { WordDisplay } from '../components/WordDisplay/WordDisplay.js'
import { useInitData } from './App.hooks.js'
import { StyleContext } from './StyleContext.js'

export const App: FC = memo(function App() {
	const { guesses, answers } = useInitData()
	return (
		<RecoilRoot>
			<Suspense fallback={<Spinner />}>
				<StyleContext>
					<Header>Wordle Solver!</Header>
					<Main>
						<WordDisplay title={'Valid guesses'} words={guesses} />
						<WordDisplay title={'Possible answers'} words={answers} />
					</Main>
				</StyleContext>
			</Suspense>
		</RecoilRoot>
	)
})

const Header = styled.h1`
margin: 0;
padding: 10px;
	width: 100%;
	height: 40px;
	color: ${({ theme }) => theme.application().highContrast().hex()};
	text-shadow: ${({ theme }) => {
		const shadow = theme.application().lowContrast().hex()
		return `1px 0 0 ${shadow},0 1px 0 ${shadow},-1px 0 0 ${shadow},0 -1px 0 ${shadow};`
	}
} 
	background: ${({ theme }) => theme.application().accent().hex()};
	border-bottom: 1px solid ${({ theme }) => theme.application().lowContrast().hex()};
`

const Main = styled.div`
	padding: 20px;
	display: flex;
	gap: 10px;
`
