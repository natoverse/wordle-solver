import { Spinner } from '@fluentui/react'
import { loadFromSpec, ThemeVariant } from '@thematic/core'
import { loadFluentTheme, ThematicFluentProvider } from '@thematic/fluent'
import { ApplicationStyles } from '@thematic/react'
import type { FC } from 'react'
import { memo, Suspense, useMemo } from 'react'
import { RecoilRoot } from 'recoil'
import { ThemeProvider } from 'styled-components'

const params = {
	accentHue: 38,
	accentSaturation: 99,
	accentLuminance: 68,
	backgroundHueShift: 50,
	backgroundLevel: 0,
	nominalHueStep: 10,
}
export const App: FC = memo(function App() {
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
	const fluentTheme = useMemo(() => loadFluentTheme(theme), [theme])

	return (
		<RecoilRoot>
			<Suspense fallback={<Spinner />}>
				<ThematicFluentProvider theme={theme}>
					<ApplicationStyles />
					<style>
						{`
                    body {
                        margin: 0;
                    }`}
					</style>
					<ThemeProvider theme={fluentTheme}>
						<div
							style={{
								width: 200,
								height: 200,
								background: theme.application().accent().hex(),
							}}
						>
							HI
						</div>
					</ThemeProvider>
				</ThematicFluentProvider>
			</Suspense>
		</RecoilRoot>
	)
})
