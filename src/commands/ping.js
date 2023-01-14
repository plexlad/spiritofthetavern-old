const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('To test for delay and if the bot is working!'),
	async execute(interaction, client) {
		// gets current date in milliseconds and uses that to measure delay
		const sent = await interaction.reply({ content: 'Pong?', ephemeral: true });
		await interaction.editReply(`Pong! Delay was ${sent.createdTimestamp - interaction.createdTimestamp}ms. Heartbeat: ${client.ws.ping}`);
	},
	preconditions: ['isMod']
}
