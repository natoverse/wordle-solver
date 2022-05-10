import type { Solver } from '../../types'
import { first } from './first'
import { popular } from './popular'
import { random } from './random'
export const solvers: Record<string, Solver> = {
	Random: random,
	First: first,
	Popularity: popular,
}
