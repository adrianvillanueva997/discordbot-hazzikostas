import axios, { AxiosPromise } from "axios";

interface Character {
  toonName: string;
  region: string;
  realm: string;
  serverID: number;
}

const addCharacter = async (character: Character): Promise<AxiosPromise> => {
  return await axios
    .post(`http://${process.env.discord_bot_api_url}/api/characters/add`, {

      toonName: character.toonName,
      region: character.region,
      realm: character.realm,
      serverID: character.serverID,
    })
    .then((r) => {
        console.log(r.data)
      return r.data;
    });
};

export { addCharacter };
