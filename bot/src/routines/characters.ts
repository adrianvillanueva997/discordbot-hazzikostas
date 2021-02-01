import axios from "axios";
import { CronJob } from "cron";
import { MessageEmbed } from "discord.js";
import { CharacterRoutine } from "../models/Character";
import { DiscordClient } from "../app";

const isPositive = (numberToCheck: number): string => {
  if (numberToCheck >= 0) return "+";
  else return "-";
};

const characterJob = new CronJob("* * * * *", async () => {
  const routineData: Array<CharacterRoutine> = await axios
    .get(`http://${process.env.discord_bot_api_url}/api/characters/routine`, {
      data: {},
    })
    .then((r) => {
      return r.data;
    });
  for (let i = 0; i < routineData.length; i++) {
    const {
      all,
      dps,
      race,
      _class,
      spec,
      region,
      realm,
      tank,
      spec0,
      spec1,
      spec2,
      spec3,
      allDif,
      dpsDif,
      healer,
      tankDif,
      serverID,
      spec0Dif,
      spec1Dif,
      spec2Dif,
      spec3Dif,
      toonName,
      healerDif,
      rankClass,
      profileUrl,
      rankFaction,
      rankOverall,
      rankClassDif,
      thumbnailUrl,
      rankFactionDif,
      rankOverallDif,
    } = routineData[i];
    for (let j = 0; j < serverID.length; j++) {
      const channel = await axios
        .get(
          `http://${process.env.discord_bot_api_url}/api/characters/getCharacterChannel`,
          { data: { serverID: serverID[j] } }
        )
        .then((r) => {
          return r.data.channelID;
        });
      try {
        const serverData = DiscordClient.guilds.cache.get(serverID[j]);
        const channelData = serverData?.channels.cache.get(channel);
        const message = new MessageEmbed();
        message.setTitle(`${toonName} ${spec} ${_class} ${race}`);
        message.setThumbnail(thumbnailUrl);
        message.setColor("BLUE");
        message.setURL(profileUrl);
        message.addField(
          "Mythic score",
          `${all} (${isPositive(allDif)}${allDif})`,
          false
        );
        message.addField("DPS", `${dps}(${isPositive(dpsDif)}${dpsDif})`, true);
        message.addField(
          "Tank",
          `${tank}(${isPositive(tankDif)}${tankDif})`,
          true
        );
        message.addField(
          "Healer",
          `${healer}(${isPositive(healerDif)}${healerDif})`,
          true
        );
        message.addField(
          "Spec 1",
          `${spec0}(${isPositive(spec0Dif)}${spec0Dif})`,
          true
        );
        message.addField(
          "Spec 2",
          `${spec1}(${isPositive(spec1Dif)}${spec1Dif})`,
          true
        );
        message.addField(
          "Spec 3",
          `${spec2}(${isPositive(spec2Dif)}${spec2Dif})`,
          true
        );
        message.addField(
          "Spec 4",
          `${spec3}(${isPositive(spec3Dif)}${spec3Dif})`,
          true
        );
        message.addField(
          "Realm",
          `${rankOverall}(${isPositive(rankOverallDif)}${rankOverallDif})`,
          true
        );
        message.addField(
          "Class",
          `${rankClass}(${isPositive(rankClassDif)}${rankClassDif})`,
          true
        );
        message.addField(
          "Faction",
          `${rankFaction}(${isPositive(rankFactionDif)}${rankFactionDif})`,
          true
        );
        // @ts-ignore
        // For some reason Typescript can't find the send property
        channelData.send(message);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await axios.post(
        `${process.env.discord_bot_api_url}/api/characters/updateStatus`,
        { toonName: toonName, region: region, realm: realm }
      );
    } catch (err) {}
  }
});

export { characterJob };
