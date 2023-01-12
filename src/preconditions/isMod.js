const { roleIDs } = require('../config.json');

module.exports = {
	check: function (interaction) {
		// checks if the user who created the interaction is a mod.
		if (interaction.member.roles.cache.has(roleIDs.mod) || interaction.member.roles.cache.has(roleIDs.admin)) {
			return true;
		}

		return false;
	}
}
