import axios from "axios";

const unSetAffix = async (
  guildID: string,
  channelID: string,
  region: string
): Promise<string> => {
  return await axios
    .delete(
      `http://${process.env.discord_bot_api_url}/api/characters/deleteAffix`,
      {
        data: {
          guildID: guildID,
          channelID: channelID,
          region: region,
        },
      }
    )
    .then((r) => {
      return r.data.message;
    })
    .catch((r) => {});
};

export { unSetAffix };
