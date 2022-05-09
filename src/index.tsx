import { createRoot } from 'react-dom/client'

import { App } from './App/index.js'

function mount(): void {
	try {
		const rootElement = document.getElementById('root')
		const root = createRoot(rootElement!)
		root.render(<App />)
	} catch (err) {
		console.error('error rendering application', err)
	}
}
mount()
