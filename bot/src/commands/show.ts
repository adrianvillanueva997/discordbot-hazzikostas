import axios from "axios";
import { MessageEmbed } from "discord.js";

const show = async (guildID: string) => {
  const response = await axios
    .get(`http://${process.env.discord_bot_api_url}/api/characters/show`, {
      data: { guildID: guildID },
    })
    .then((r) => {
      return r.data.message;
    })
    .catch();
  if (response == Array) {
    for (let i = 0; i < response.length; i++) {
      console.log(response[i]);
    }
  }
  console.log(typeof response);
  console.log(response.length);
  if (response == String) {
    return response;
  } else {
    console.log(response[0]);
    const message = new MessageEmbed();
    message.setColor("BLUE");
    message.setFooter("Feel free to text Xiao#4196 about your feedback!");
    message.setTitle("Current registered characters");
    for (let i = 0; i < response.length; i++) {
      const { toonName, realm, region } = response[i];
      message.addField(toonName, `${realm} ${region}`, true);
    }
    return message;
  }
};

export { show };
