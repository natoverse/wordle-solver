import { initializeIcons } from '@fluentui/react/lib/Icons'
import { createRoot } from 'react-dom/client'

import { App } from './App/index.js'

function mount(): void {
	try {
		const rootElement = document.getElementById('root')
		initializeIcons(undefined, { disableWarnings: true })
		const root = createRoot(rootElement!)
		root.render(<App />)
	} catch (err) {
		console.error('error rendering application', err)
	}
}
mount()
