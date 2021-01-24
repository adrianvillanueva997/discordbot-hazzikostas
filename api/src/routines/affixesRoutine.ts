import { CronJob } from "cron";
import { Raider } from "../services/raider";
import { affixes } from "../models/Affixes";

const job = new CronJob("55 18 * * 2", async () => {
  console.log("Starting affixes routine");
  const regions = ["us", "eu", "tw", "kr", "cn"];
  for (let i = 0; i < regions.length; i++) {
    const region = regions[i];
    const affixesData = await Raider.getAffixes(region, "en");
    const exists = await affixes.findOne({
      region: region,
      title: affixesData.title,
    });
    if (exists === null) {
      const build = affixes.build(affixesData);
      await build.save();
    } else {
      await affixes.findByIdAndUpdate(
        { _id: exists._id },
        { title: affixesData.title, details: affixesData.details }
      );
    }
  }
});

export { job as AffixesJob };
