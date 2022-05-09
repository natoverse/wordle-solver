/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
const { configure } = require('@essex/jest-config')
module.exports = {
	projects: [
		{
			...configure(),
			displayName: 'node',
			testEnvironment: 'node',
			testMatch: ['**/*.spec.ts'],
		},
	],
}
