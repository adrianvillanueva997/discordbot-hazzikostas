import axios from "axios";
import { CronJob } from "cron";
import { DiscordClient } from "../app";
import { MessageEmbed } from "discord.js";

const isPositive = (numberToCheck: number): string => {
  if (numberToCheck >= 0) return "+";
  else return "-";
};
const updateCharacterStatus = async (characterData: any) => {
  console.log(
    characterData.toonName,
    characterData.region,
    characterData.realm
  );
  return await axios
    .post(
      `http://${process.env.discord_bot_api_url}/api/characters/updateStatus`,
      {
        toonName: characterData.toonName,
        region: characterData.region,
        realm: characterData.realm,
      }
    )
    .then((r) => {
      return r.status;
    });
};

const getCharacters = async () => {
  return await axios
    .get(`http://${process.env.discord_bot_api_url}/api/characters/routine`, {
      data: {},
    })
    .then(async (r) => {
      return r.data;
    });
};

const getChannels = async (serverID: any) => {
  return await axios
    .get(
      `http://${process.env.discord_bot_api_url}/api/characters/getCharacterChannel`,
      { data: { serverID: serverID } }
    )
    .then(async (r) => {
      return r.data;
    });
};
const sendMessage = (character: any, characterServer: any) => {
  try {
    const serverData = DiscordClient.guilds.cache.get(characterServer.serverID);
    const channelData = serverData?.channels.cache.get(
      characterServer.channelID
    );
    const message = new MessageEmbed();
    message.setTitle(
      `${character.toonName} ${character.spec} ${character._class} ${character.race}`
    );
    message.setThumbnail(character.thumbnailUrl);
    message.setColor("BLUE");
    message.setURL(character.profileUrl);
    message.addField(
      "Mythic score",
      `${character.all} (${isPositive(character.allDif)}${character.allDif})`,
      false
    );
    message.addField(
      "DPS",
      `${character.dps}(${isPositive(character.dpsDif)}${character.dpsDif})`,
      true
    );
    message.addField(
      "Tank",
      `${character.tank}(${isPositive(character.tankDif)}${character.tankDif})`,
      true
    );
    message.addField(
      "Healer",
      `${character.healer}(${isPositive(character.healerDif)}${
        character.healerDif
      })`,
      true
    );
    message.addField(
      "Spec 1",
      `${character.spec0}(${isPositive(character.spec0Dif)}${
        character.spec0Dif
      })`,
      true
    );
    message.addField(
      "Spec 2",
      `${character.spec1}(${isPositive(character.spec1Dif)}${
        character.spec1Dif
      })`,
      true
    );
    message.addField(
      "Spec 3",
      `${character.spec2}(${isPositive(character.spec2Dif)}${
        character.spec2Dif
      })`,
      true
    );
    message.addField(
      "Spec 4",
      `${character.spec3}(${isPositive(character.spec3Dif)}${
        character.spec3Dif
      })`,
      true
    );
    message.addField(
      "Realm",
      `${character.rankOverall}(${isPositive(character.rankOverallDif)}${
        character.rankOverallDif
      })`,
      true
    );
    message.addField(
      "Class",
      `${character.rankClass}(${isPositive(character.rankClassDif)}${
        character.rankClassDif
      })`,
      true
    );
    message.addField(
      "Faction",
      `${character.rankFaction}(${isPositive(character.rankFactionDif)}${
        character.rankFactionDif
      })`,
      true
    );
    // @ts-ignore
    channelData.send(message);
  } catch (err) {
    console.log(err);
  }
};

const characterJob = new CronJob("0 6,12,18,0 * * *", async () => {
  getCharacters().then((characters) => {
    for (let i = 0; i < characters.length; i++) {
      const character = characters[i];
      for (let j = 0; j < character.serverID.length; j++) {
        const serverID = character.serverID[j];
        getChannels(serverID).then((serverData) => {
          sendMessage(character, serverData);
        });
      }
      updateCharacterStatus(character).then((r) => {
        console.log(r);
      });
    }
  });
});

export { characterJob };
