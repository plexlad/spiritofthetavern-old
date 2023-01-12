const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		// gets current date in milliseconds and uses that to measure delay
		const current = Date.now()
		await interaction.reply({ content: 'Pong!', ephemeral: true });
		const delay = Date.now() - current;
		await interaction.editReply(`Pong! Delay was ${delay}ms`);
	},
	preconditions: ['isMod']
}