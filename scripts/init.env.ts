import { readFileSync, statSync } from 'node:fs';
const path = require('path');

export function loadEnvVariables() {
	let envPath = path.join(__dirname, '/../.env');
	const stats = statSync(envPath, { throwIfNoEntry: false });
	if (!stats) {
		envPath = path.join(__dirname, '/../../.env');
	}

	try {
		const data = readFileSync(envPath, 'utf8');

		const lines = data.split('\n');

		lines.forEach((line) => {
			const cleanedLine = line.trim();
			if (cleanedLine && cleanedLine[0] !== '#') {
				const [key, value] = cleanedLine.split('=');
				if (key && value) {
					process.env[key] = value;
				}
			}
		});
	} catch (err) {
		console.error('An error occurred while reading .env file:', err);
	}
}
