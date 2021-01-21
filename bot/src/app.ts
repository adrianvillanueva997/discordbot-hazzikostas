import Discord from "discord.js";
import { help } from "./commands/help";

require("dotenv").config();
const client = new Discord.Client();

client.on("ready", () => {
  if (client.user != null) console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (msg: any) => {
  if (
    !msg.content.startsWith(process.env.discord_bot_prefix) ||
    msg.author.bot ||
    process.env.discord_bot_prefix === undefined
  ) {
    return;
  }
  const args = msg.content
    .slice(process.env.discord_bot_prefix.length)
    .trim()
    .split(/ +/);
  const command = args.shift().toLowerCase();
  const guildID = msg.guild.id;
  const channelID = msg.channel.id;
  switch (command) {
    case "commands":
      msg.channel.send(help());
      break;
    case "setaffixes":
      break;
    case "unsetaffixes":
      break;
    case "setcharacterupdates":
      break;
    case "unsetcharacterupdates":
      break;
    case "show":
      break;
    case "add":
      break;
    case "delete":
      break;
    case "stats":
      break;
    default:
      return;
  }
});

client.login(process.env.discord_bot_key).then(async () => {
  const connectedGuilds = client.guilds.cache.map((guild: any) => guild.id);
  console.log(`Bot connected to: ${connectedGuilds.length} servers`);
});
