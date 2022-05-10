const fs = require('fs')
// load the possible guesses csv and frequency file,
// intersect the two so each guess has a popularity rank
function run() {
	const guessesContent = fs.readFileSync('../public/guesses.csv', 'utf-8')
	const guesses = guessesContent.split(',')

	const freqContent = fs.readFileSync('./unigram_freq.csv', 'utf-8')
	const freqRows = freqContent.split('\n')

	const freqMap = freqRows.reduce((acc, cur) => {
		const pair = cur.split(',')
		acc.set(pair[0], +pair[1])
		return acc
	}, new Map())

	// note - there actually are a few missing, we'll just mark them with 0 so they sort last
	const mapped = guesses.map(guess => {
		return [guess, freqMap.get(guess) || 0]
	})

	const max = mapped.reduce((acc, cur) => Math.max(acc, cur[1]), 0)

	// normalize the counts and reduce the precision
	const normalized = mapped.map(pair => [
		pair[0],
		Math.round((pair[1] / max) * 100000) / 100000,
	])

	// write them back out as a csv
	const rows = normalized.map(pair => pair.join(','))
	const content = [['word', 'rank'], ...rows].join('\n')

	fs.writeFileSync('../public/guesses-ranked.csv', content)
}

run()
