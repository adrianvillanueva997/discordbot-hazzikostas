import { MessageEmbed } from "discord.js";

export const help = (): MessageEmbed => {
  const message = new MessageEmbed();
  message.setColor("BLUE");
  message.setFooter("Feel free to text Xiao#4196 about your feedback!");
  message.setTitle("Ion's commands!");
  message.addField(
    "Commands",
    "Shows the current bot commands. (command params in parenthesis)",
    false
  );
  message.addField(
    "Add",
    "Adds a new character to be tracked. (name, region, realm)",
    false
  );
  message.addField("Delete", "Deletes a tracked character.", false);
  message.addField("Show", "Shows the current tracked characters.", false);
  message.addField(
    "setAffixes",
    "Sets the channel for affixes updates (region)",
    false
  );
  message.addField(
    "unSetAffixes",
    "Unsets the channel that is used for affixes updates. (region)",
    false
  );
  message.addField(
    "setCharacterUpdates",
    "Sets the channel for character updates.",
    false
  );
  message.addField(
    "unSetCharacterUpdates",
    "Unsets the channel for character updates.",
    false
  );
  message.addField("stats", "Shows stats related with the bot.", false);
  return message;
};
