import {
	DefaultButton,
	Pivot,
	PivotItem,
	Spinner,
	TextField,
} from '@fluentui/react'
import type { FC } from 'react'
import { memo, Suspense } from 'react'
import { RecoilRoot } from 'recoil'
import styled from 'styled-components'

import { Solvers } from '../components/Solvers.js'
import { WordBoxes } from '../components/WordBoxes.js'
import { WordDisplay } from '../components/WordDisplay.js'
import { useData, useInputs, useMarkedResults } from './App.hooks.js'
import { ComparisonTab } from './components/ComparisonTab.js'
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

	const { doTest, tries, remaining, doSolver } = useMarkedResults(
		guess,
		solution,
		answers,
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
									onChange={(_e, val) => onSolutionChange(val!)}
								/>
								<DayPicker current={date} onChange={onDateChange} />
							</Stack>
							<TextField
								label="Guess"
								value={guess}
								onChange={(_e, val) => onGuessChange(val!)}
							/>
							<DefaultButton onClick={doTest}>Check</DefaultButton>
							{tries.map((t, idx) => (
								<WordBoxes key={idx} word={t} />
							))}
						</Stacked>

						<Pivot>
							<PivotItem headerText="Solve" itemKey="solve">
								<Tab>
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
									<Stack>
										Solve it:
										<Solvers onClick={doSolver} />
									</Stack>
								</Tab>
							</PivotItem>
							<PivotItem headerText="Battle!" itemKey="comparison">
								<Tab>
									<ComparisonTab
										guesses={guesses}
										answers={answers}
										start={guess}
									/>
								</Tab>
							</PivotItem>
						</Pivot>
					</Main>
				</StyleContext>
			</Suspense>
		</RecoilRoot>
	)
})

const Main = styled.div`
	padding: 20px;
	display: flex;
	gap: 20px;
`

const Stacked = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	width: 188px;
`

const Stack = styled.div``

const Tab = styled.div`
	display: flex;
	gap: 10px;
	padding-top: 10px;
`
