import { loadFromSpec, ThemeVariant } from '@thematic/core'
import { loadFluentTheme, ThematicFluentProvider } from '@thematic/fluent'
import { ApplicationStyles } from '@thematic/react'
import type { FC, ReactNode } from 'react'
import { useMemo } from 'react'
import { ThemeProvider } from 'styled-components'

export const StyleContext: FC<{
	children?: ReactNode
}> = ({ children }) => {
	const { theme, fluent } = useTheming()

	return (
		<ThematicFluentProvider theme={theme}>
			<ApplicationStyles />
			<style>
				{`
    body {
        margin: 0;
        box-sizing: border-box;
    }`}
			</style>
			<ThemeProvider theme={fluent}>{children}</ThemeProvider>
		</ThematicFluentProvider>
	)
}

const params = {
	accentHue: 38,
	accentSaturation: 99,
	accentLuminance: 68,
	backgroundHueShift: 50,
	backgroundLevel: 0,
	nominalHueStep: 10,
}

function useTheming() {
	const theme = useMemo(
		() =>
			loadFromSpec(
				{
					params,
				},
				{
					variant: ThemeVariant.Dark,
				},
			),
		[],
	)
	const fluent = useMemo(() => loadFluentTheme(theme), [theme])

	return {
		theme,
		fluent,
	}
}
