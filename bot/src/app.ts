import Discord from "discord.js";

import { help } from "./commands/help";
import { addCharacter } from "./commands/add";
import { argsChecker } from "./middleware/argsChecker";
import { deleteCharacter } from "./commands/delete";
import { show } from "./commands/show";
import { setAffix } from "./commands/setAffixes";
import { unSetAffix } from "./commands/unSetAffixes";
import { setCharacterChannel } from "./commands/setCharacterUpdate";
import { unSetCharacterChannel } from "./commands/unSetCharacterUpdate";
import { affixesJob } from "./routines/affixes";
import { characterJob } from "./routines/characters";

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
  let check = undefined;
  switch (command) {
    case "commands":
      await message.channel.send(help());
      break;
    case "setaffixes":
      check = argsChecker(1, args.length);
      if (check === undefined) {
        const result = await setAffix(
          guildID,
          channelID,
          args[0].toLowerCase()
        );
        await message.channel.send(result);
      } else await message.channel.send(check);
      break;
    case "unsetaffixes":
      check = argsChecker(1, args.length);
      if (check === undefined) {
        const response = await unSetAffix(
          guildID,
          channelID,
          args[0].toLowerCase()
        );
        await message.channel.send(response);
      } else await message.channel.send(check);
      break;
    case "setcharacterupdates":
      const response = await setCharacterChannel(guildID, channelID);
      await message.channel.send(response);
      break;
    case "unsetcharacterupdates":
      const res = await unSetCharacterChannel(guildID, channelID);
      await message.channel.send(res);
      break;
    case "show":
      const result = await show(guildID);
      await message.channel.send(result);
      break;
    case "add":
      check = argsChecker(3, args.length);
      if (check === undefined) {
        const result = await addCharacter({
          toonName: args[0].toLowerCase(),
          realm: args[1].toLowerCase(),
          region: args[2].toLowerCase(),
          serverID: guildID,
        });
        await message.channel.send(result);
      } else {
        await message.channel.send(check);
      }
      break;
    case "delete":
      check = argsChecker(3, args.length);
      if (check === undefined) {
        const result = await deleteCharacter({
          toonName: args[0].toLowerCase(),
          realm: args[1].toLowerCase(),
          region: args[2].toLowerCase(),
          serverID: guildID,
        });
        await message.channel.send(result);
      } else {
        await message.channel.send(check);
      }
      break;
    case "stats":
      await message.channel.send("Command not yet available!");
      break;
    default:
      return;
  }
});
client.login(process.env.discord_bot_key).then(async () => {
  const connectedGuilds = client.guilds.cache.map((guild: any) => {
    guild.id;
  });
  console.log(`Bot connected to: ${connectedGuilds.length} servers`);
  affixesJob.start();
  characterJob.start();
});

export { client as DiscordClient };
