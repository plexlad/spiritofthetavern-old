const { REST, Routes } = require('discord.js');
const { CLIENT_ID, DISCORD_TOKEN } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path')

module.exports = async function() {
	let errorMessage;
	const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

	const commands = [];
	const commandsPath = path.join(__dirname, 'commands');
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

	rest.put(Routes.applicationCommands(CLIENT_ID), { body: [] })
		.then(() => console.log('[BOT] Successfully reset slash commands.'))
		.catch((error) => {
			errorMessage = error
		})

	try {
		for (const file of commandFiles) {
			const command = require(`./commands/${file}`);
			commands.push(command.data.toJSON());
		}

		console.log(`[BOT] Started refreshing ${commands.length} application slash commands.`);
		const data = await rest.put(
			Routes.applicationCommands(CLIENT_ID),
			{ body: commands }
		);

		console.log(`[BOT] Successfully reloaded ${data.length} application slash commands.`);
	} catch(error) {
	}

	return new Promise((resolve, reject) => {
		if (errorMessage) {
			reject(errorMessage);
		} else {
			resolve(DISCORD_TOKEN);
		}
	});
}
