const { SlashCommandBuilder } = require('discord.js');
const registrationHandler = require('../registrationHandler.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dev')
		.setDescription('A set of commands used for development.')
		.addSubcommand(subcommand => {
			return subcommand
				.setName('register')
				.setDescription('Registers the slash commands from the registration folder!')
		}),
	async execute(interaction, client) {
		registrationHandler(client);
		await interaction.reply({ content: 'Commands registered!', ephemeral: true });
	},
	preconditions: ['isAdmin']
}
