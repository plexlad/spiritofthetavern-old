const fs = require('node:fs');
const path = require('node:path');
const { Events } = require('discord.js');

module.exports = (client) => {
	const scriptsPath = path.join(__dirname, 'scripts');
	const scriptFiles = fs.readdirSync(scriptsPath).filter(file => file.endsWith('.js'));

	let readyArray = [];
	for (const file of scriptFiles) {
		const filePath = path.join(scriptsPath, file);
		const script = require(filePath);
		if (script.ready) {
			readyArray.push(script.ready);
		}
	}

	client.once(Events.ClientReady, () => {
		console.log(`[BOT] is logged in as ${client.user.username}`);
		for (const func of readyArray) {
			func();
		}
	});
}
