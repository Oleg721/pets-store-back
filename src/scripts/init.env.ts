const fs = require('fs').promises;
const path = require('path');

export async function loadEnvVariables() {
	const envPath = path.join(__dirname, '/../../.env');

	try {
		const data = await fs.readFile(envPath, 'utf8');

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
