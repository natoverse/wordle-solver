import { IconButton } from '@fluentui/react'
import { addDays, subDays } from 'date-fns'
import type { FC} from 'react';
import { useCallback } from 'react'
import styled from 'styled-components'

export interface DayPickerProps {
	current: Date
	onChange?: (date: Date) => void
}

export const DayPicker: FC<DayPickerProps> = ({ current, onChange }) => {
	const handleDecrement = useCallback(() => {
		onChange?.(subDays(current, 1))
	}, [current, onChange])

	const handleIncrement = useCallback(() => {
		onChange?.(addDays(current, 1))
	}, [current, onChange])

	return (
		<Container>
			<Day>{current.toDateString()}</Day>
			<Buttons>
				<IconButton
					iconProps={{ iconName: 'Back' }}
					onClick={handleDecrement}
				/>
				<IconButton
					iconProps={{ iconName: 'Forward' }}
					onClick={handleIncrement}
				/>
			</Buttons>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`

const Day = styled.div`
	flex: 1;
`
const Buttons = styled.div``
