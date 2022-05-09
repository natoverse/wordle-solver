import { DefaultButton, Spinner, TextField } from '@fluentui/react'
import type { FC } from 'react'
import { memo, Suspense } from 'react'
import { RecoilRoot } from 'recoil'
import styled from 'styled-components'

import { WordBoxes } from '../components/WordBoxes/WordBoxes.js'
import { WordDisplay } from '../components/WordDisplay/WordDisplay.js'
import { useData, useInputs, useMarkedResults } from './App.hooks.js'
import { DayPicker } from './components/DayPicker.js'
import { Header } from './components/Header.js'
import { StyleContext } from './StyleContext.js'

export const App: FC = memo(function App() {
	const { guesses, answers } = useData()
	const {
		solution,
		onSolutionChange,
		guess,
		onGuessChange,
		date,
		onDateChange,
	} = useInputs(answers)

	const { doTest, tries, remaining } = useMarkedResults(
		guess,
		solution,
		guesses,
	)

	return (
		<RecoilRoot>
			<Suspense fallback={<Spinner />}>
				<StyleContext>
					<Header />

					<Main>
						<Stacked>
							<Stack>
								<TextField
									label="Solution"
									value={solution}
									onChange={(_e, val) => onSolutionChange(val)}
								/>
								<DayPicker current={date} onChange={onDateChange} />
							</Stack>
							<TextField
								label="Guess"
								value={guess}
								onChange={(_e, val) => onGuessChange(val)}
							/>
							<DefaultButton onClick={doTest}>Check</DefaultButton>
							{tries.map((t, idx) => (
								<WordBoxes key={idx} word={t} />
							))}
						</Stacked>
						<WordDisplay
							title={'Possible solutions'}
							words={answers}
							onWordClick={onSolutionChange}
						/>
						<WordDisplay
							title={'Valid guesses'}
							words={guesses}
							onWordClick={onGuessChange}
						/>
						<WordDisplay
							title={'Remaining guesses'}
							words={remaining}
							onWordClick={onGuessChange}
						/>
					</Main>
				</StyleContext>
			</Suspense>
		</RecoilRoot>
	)
})

const Main = styled.div`
	padding: 20px;
	display: flex;
	gap: 12px;
`

const Stacked = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	width: 200px;
`

const Stack = styled.div``
