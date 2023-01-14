// Does initial setup and starts the server
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const handler = require('./handler.js');
const registrationHandler = require('./registrationHandler.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.config = require('./config.json');
const { DISCORD_TOKEN } = client.config;

client.vars = {};

handler(client);
registrationHandler(client);

client.once(Events.ClientReady, () => {
	console.log(`[BOT] Spirit is logged in as ${client.user.username}!`);
});

client.login(DISCORD_TOKEN);

