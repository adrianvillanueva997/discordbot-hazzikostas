import { CronJob } from "cron";
import { Character } from "../models/Character";

const job = new CronJob("* * * * *", async () => {
  const characters = await Character.find({});
  console.log(characters);
  // for (let i = 0; i < characters.length; i++) {}
});

export { job as CharacterJob };
