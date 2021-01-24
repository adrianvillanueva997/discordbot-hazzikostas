import Discord from "discord.js";

import { help } from "./commands/help";
import { addCharacter } from "./commands/add";
import { argsChecker } from "./middleware/argsChecker";

require("dotenv").config();
const client = new Discord.Client();

client.on("ready", () => {
  if (client.user != null) console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (message: any) => {
  if (
    !message.content.startsWith(process.env.discord_bot_prefix) ||
    message.author.bot ||
    process.env.discord_bot_prefix === undefined
  ) {
    return;
  }
  const args = message.content
    .slice(process.env.discord_bot_prefix.length)
    .trim()
    .split(/ +/);
  const command = args.shift().toLowerCase();
  const guildID = message.guild.id;
  const channelID = message.channel.id;
  switch (command) {
    case "commands":
      message.channel.send(help());
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
      const check = argsChecker(3, args.length);
      if (check === undefined) {
        console.log(args);
        const result = await addCharacter({
          toonName: args[0],
          realm: args[1],
          region: args[2],
          serverID: guildID,
        });
        console.log(result);
        message.channel.send(result);
      } else {
        message.channel.send(check);
      }
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
