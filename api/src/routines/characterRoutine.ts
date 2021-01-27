import { CronJob } from "cron";
import { Character, CharacterDoc } from "../models/Character";
import { Raider } from "../services/raider";

function sleep(milliseconds: number) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

const job = new CronJob("* * * * *", async () => {
  const characters: CharacterDoc[] = await Character.find({});
  for (let i = 0; i < characters.length; i++) {
    if (i % 300) {
      // This is necessary because raider.io is limited to 300 requests per minute
      sleep(1000);
    }
    try {
      const { toonName, region, realm, _id } = characters[i];
      const {
        race,
        spec,
        role,
        faction,
        thumbnailUrl,
        profileUrl,
        all,
        dps,
        healer,
        tank,
        spec0,
        spec1,
        spec2,
        spec3,
        rankClass,
        rankFaction,
        rankOverall,
      } = await Raider.getCharacterData(region, realm, toonName);
      if (characters[i].postStatus === undefined) {
        await Character.findByIdAndUpdate(
          { _id: _id },
          {
            race: race,
            spec: spec,
            role: role,
            faction: faction,
            thumbnailUrl: thumbnailUrl,
            profileUrl: profileUrl,
            all: all,
            dps: dps,
            healer: healer,
            tank: tank,
            spec0: spec0,
            spec1: spec1,
            spec2: spec2,
            spec3: spec3,
            rankClass: rankClass,
            rankFaction: rankFaction,
            rankOverall: rankOverall,
            postStatus: 1,
          },
          { useFindAndModify: false }
        );
      } else {
        if (
          characters[i].all != all ||
          characters[i].rankOverall != rankOverall ||
          characters[i].rankFaction != rankFaction ||
          characters[i].rankClass != rankClass ||
          characters[i].spec3 != spec3 ||
          characters[i].spec1 != spec1 ||
          characters[i].spec0 != spec0 ||
          characters[i].spec2 != spec2 ||
          characters[i].healer != healer ||
          characters[i].tank != tank ||
          characters[i].dps != dps
        ) {
          await Character.findByIdAndUpdate(
            { _id: characters[i]._id },
            {
              all: all,
              allDif: all - characters[i].all,
              rankClass: rankClass,
              rankClassDif: rankClass - characters[i].rankClass,
              rankFaction: rankFaction,
              rankFactionDif: rankFaction - characters[i].rankFaction,
              spec0: spec0,
              spec0Dif: spec0 - characters[i].spec0,
              spec1: spec1,
              spec1Dif: spec1 - characters[i].spec1,
              spec2: spec2,
              spec2Dif: spec2 - characters[i].spec2,
              spec3: spec3,
              spec3Dif: spec3 - characters[i].spec3,
              dps: dps,
              dpsDif: dps - characters[i].dps,
              tank: tank,
              tankDif: tank - characters[i].tank,
              healer: healer,
              healerDif: healer - characters[i].healer,
              thumbnailUrl: thumbnailUrl,
              postStatus: 1,
            },
            { useFindAndModify: false }
          );
        }
      }
    } catch (err) {
      console.log(`Character: ${characters[i].toonName} not found, deleting!`);
      await Character.deleteOne(
        {
          toonName: characters[i].toonName,
          realm: characters[i].realm,
          region: characters[i].region,
        },
        { useFindAndModify: false }
      );
    }
  }
});

export { job as CharacterJob };
