const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { DISCORD_TOKEN } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// creates a commands Collection and does setup for the command loader
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

// does setup and loader for preconfigurations
client.preconditions = new Collection();
const preconsPath = path.join(__dirname, 'preconditions');
const preconsFiles = fs.readdirSync(preconsPath).filter(file => file.endsWith('.js'));
const preconsArray = [];

for (const file of preconsFiles) {
	const filePath = path.join(preconsPath, file);
	const precon = require(filePath);
	client.preconditions.set(file.slice(0, -3), precon);
}

client.once(Events.ClientReady, () => {
	console.log('[BOT] Spirit is ready!');
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;  // check if it is a chat command

	const command = interaction.client.commands.get(interaction.commandName);  // grabs command

	if (!command) return;  // checks if command exists

	// checks through the preconditions
	let validPrecons = true;
	for (const precon of client.commands.get(interaction.commandName).preconditions) {
		if (!client.preconditions.get(precon).check(interaction)) {
			validPrecons = false;
		}
	}
	
	// command goes through if valid, otherwise sends permission reply
	if (validPrecons) {
		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: `There was an error while executing this command!`, ephemeral: true});
		}
	} else {
		interaction.reply({ content: 'Sorry, you do not have the permissions to use this command!', ephemeral: true});
	}
});

client.login(DISCORD_TOKEN);

