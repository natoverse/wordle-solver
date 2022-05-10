const fs = require('fs')
// load the possible wordes csv and frequency file,
// intersect the two so each guess has a popularity rank
function run() {
	const guessesContent = fs.readFileSync('../public/guesses.csv', 'utf-8')
	const guesses = guessesContent.split(',')

	const freqContent = fs.readFileSync('./unigram_freq.csv', 'utf-8')
	const freqRows = freqContent.split('\n')

	const counted = popularity(guesses, freqRows)

	const scored = letterScored(counted)
	// write them back out as a csv
	const content = format(scored)

	fs.writeFileSync('../public/guesses-ranked.csv', content)
}

function popularity(words, counts) {
	const freqMap = counts.reduce((acc, cur) => {
		const pair = cur.split(',')
		acc.set(pair[0], +pair[1])
		return acc
	}, new Map())

	// note - there actually are a few missing, we'll just mark them with 0 so they sort last
	const mapped = words.map(word => {
		return [word, freqMap.get(word) || 0]
	})

	const max = mapped.reduce((acc, cur) => Math.max(acc, cur[1]), 0)

	// normalize the counts and reduce the precision
	const normalized = mapped.map(pair => [
		pair[0],
		Math.round((pair[1] / max) * 100000) / 100000,
	])

	return normalized
}

// for every letter, count its value in each position
// this will let us derive a frequency rank based on likely letter positions
function letterScored(words) {
	console.log(words)
	const letters = 'abcdefghijklmnopqrstuvwxyz'
	const map = letters.split('').reduce((acc, cur) => {
		acc[cur] = 0
		return acc
	}, {})

	// fill an empty map at each letter position, with zerod out counts for each letter
	const positions = new Array(5).fill(1).map(() => ({ ...map }))

	// count up the letter instances for each position
	words.forEach(word => {
		const letters = word[0].split('')
		letters.forEach((letter, letterIndex) => {
			positions[letterIndex][letter]++
		})
	})

	const positionMaxes = positions.map(position => {
		return Object.values(position).reduce((acc, cur) => Math.max(acc, cur), 0)
	})

	// normalize the letter counts in each position based on the max for that position
	const normalized = positions.map((position, positionIndex) => {
		return Object.entries(position).reduce((acc, cur) => {
			acc[cur[0]] = cur[1] / positionMaxes[positionIndex]
			return acc
		}, {})
	})

	// score each word based on how common its letters are
	const scored = words.map(word => {
		const letters = word[0].split('')
		const score = letters.reduce((acc, cur, idx) => {
			return acc * normalized[idx][cur]
		}, 1)

		// this is a very cheap proxy for duplication - just check the unique letters
		const dupCount = Object.keys(
			letters.reduce((acc, cur) => {
				acc[cur] = true
				return acc
			}, {}),
		).length

		// reduce the scores by the number of duplicated letters
		// these cause a loss of information
		const penalty = 6 - dupCount
		const adjusted = score / penalty
		const rounded = Math.round(adjusted * 100000) / 100000
		return [...word, rounded]
	})

	console.log(scored)
	return scored
}

// format for csv printing
function format(words) {
	const rows = words.map(pair => pair.join(','))
	return [['word', 'rank', 'score'], ...rows].join('\n')
}

run()
