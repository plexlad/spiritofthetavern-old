// Does initial setup and starts the server
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');

const handler = require('./handler.js');
const registrationHandler = require('./registrationHandler.js');
const scriptHandler = require('./scriptHandler.js');

// creates a new client with permissions: Guilds
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.config = require('./config.json');
const { DISCORD_TOKEN } = client.config;

client.vars = {};  // creates an object for variables that can be used in features by developers

client.once(Events.ClientReady, () => {
	console.log(`[BOT] Spirit is logged in as ${client.user.username}!`);
});

handler(client);
scriptHandler(client);

const register = registrationHandler()
	.then((result) => {
		client.login(result);
	})
	.catch((error) => {
		console.log('[BOT] Could not successfully log in.');
		console.error(error);
	});
