import { CronJob } from "cron";
import { Character, CharacterDoc } from "../models/Character";
import { Raider } from "../services/raider";

const job = new CronJob("* * * * *", async () => {
  const characters: CharacterDoc[] = await Character.find({});
  for (let i = 0; i < characters.length; i++) {
    if (characters[i].postStatus != undefined) {
    }
    try {
      const { toonName, region, realm } = characters[i];
      console.log(toonName, region, realm);
      await Raider.getCharacterData(region, realm, toonName);
    } catch (err) {}
  }
});

export { job as CharacterJob };
