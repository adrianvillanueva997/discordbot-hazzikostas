import axios from "axios";

const setAffix = async (
  guildID: string,
  channelID: string,
  region: string
): Promise<string> => {
  return await axios
    .post(`http://${process.env.discord_bot_api_url}/api/characters/setAffix`, {
      guildID: guildID,
      channelID: channelID,
      region: region,
    })
    .then((r) => {
      return r.data.message;
    })
    .catch((r) => {});
};

export { setAffix };
