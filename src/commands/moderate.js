const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('moderate')
		.setDescription('A set of commands for moderation by moderators.')
		.addSubcommand(subcommand => {
			return subcommand
				.setName('quiettime')
				.setDescription('Disables all channels except configured.')
		}),
	async execute(interaction, client) {
		await interaction.reply({ content: "It's working!", ephemeral: true});
	},
	preconditions: ['isMod']
}
