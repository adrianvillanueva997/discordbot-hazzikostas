import axios from "axios";

const setCharacterChannel = async (serverID: string, channelID: string) => {
  return await axios
    .post(
      `http://${process.env.discord_bot_api_url}/api/characters/setcharacterchannel`,
      {
        serverID: serverID,
        channelID: channelID,
      }
    )
    .then((r) => {
      return r.data.message;
    })
    .catch((r) => {});
};
export { setCharacterChannel };
