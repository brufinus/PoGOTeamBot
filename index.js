require("dotenv").config()
const Discord = require("discord.js")
const client = new Discord.Client()

// Text Channel IDs
var teamChooserTextID = process.env.TEAM_CHOOSER_TEXT_ID

// Role IDs
var valorRoleID = process.env.VALOR_ROLE_ID
var mysticRoleID = process.env.MYSTIC_ROLE_ID
var instinctRoleID = process.env.INSTINCT_ROLE_ID

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

/**
 * Lets users set their own role.
 * Works only in a certain text channel.
 */
client.on("message", msg => {
	if (msg.author.bot) return;
	
	msg.content = msg.content.toLowerCase();
	
	let memRole = msg.member.roles;
	
	if ((msg.channel.id).localeCompare(teamChooserTextID) == 0) {
		if (msg.content.localeCompare('!t valor') == 0) {
			memRole.remove(mysticRoleID);
			memRole.remove(instinctRoleID);
			memRole.add(valorRoleID);
			msg.reply("your team has been set to Valor!");
		}
		else if (msg.content.localeCompare('!t mystic') == 0) {
			memRole.remove(valorRoleID);
			memRole.remove(instinctRoleID);
			memRole.add(mysticRoleID);
			msg.reply("your team has been set to Mystic!");
		}
		else if (msg.content.localeCompare('!t instinct') == 0) {
			memRole.remove(valorRoleID);
			memRole.remove(mysticRoleID);
			memRole.add(instinctRoleID);
			msg.reply("your team has been set to Instinct!");
		}
		else if (msg.content.startsWith("!t")) {
			msg.reply("correct usage of the team command is **!t <team>**");
		}
		else {
			msg.delete();
			msg.reply("please only use this chat to set your team!");
		}
	}
})

client.login(process.env.BOT_TOKEN)