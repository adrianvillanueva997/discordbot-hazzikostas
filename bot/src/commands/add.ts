import axios from "axios";
import { Character } from "../models/Character";

const addCharacter = async (character: Character): Promise<string> => {
  return await axios
    .post(`http://${process.env.discord_bot_api_url}/api/characters/add`, {
      toonName: character.toonName,
      region: character.region,
      realm: character.realm,
      serverID: character.serverID,
    })
    .then((r) => {
      return r.data.message;
    })
    .catch((r) => {
      return r;
    });
};

export { addCharacter };
