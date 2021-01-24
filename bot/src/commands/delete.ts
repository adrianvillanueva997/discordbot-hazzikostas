import axios from "axios";
import { Character } from "../models/Character";

const deleteCharacter = async (character: Character): Promise<string> => {
  return await axios
    .delete(
      `http://${process.env.discord_bot_api_url}/api/characters/delete/`,
      {
        data: {
          toonName: character.toonName,
          region: character.region,
          realm: character.realm,
          serverID: character.serverID,
        },
      }
    )
    .then((r) => {
      return r.data.message;
    })
    .catch((r) => {
      return r;
    });
};

export { deleteCharacter };
