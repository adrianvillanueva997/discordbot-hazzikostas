import axios from "axios";

const unSetCharacterChannel = async (serverID: string, channelID: string) => {
  return await axios
    .delete(
      `http://${process.env.discord_bot_api_url}/api/characters/unsetcharacterchannel`,
      {
        data: {
          serverID: serverID,
          channelID: channelID,
        },
      }
    )
    .then((r) => {
      return r.data.message;
    })
    .catch((r) => {});
};
export { unSetCharacterChannel };
