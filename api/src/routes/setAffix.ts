import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { setAffixChannel } from "../models/setAffixChannel";

const router = express.Router();

router.post(
  "/api/characters/setAffix",
  body("guildID").isString(),
  body("channelID").isString(),
  body("region").isString(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let { guildID, channelID, region } = req.body;
    region = region.lowercase;
    if (region != "us" || "eu" || "tw" || "kr" || "cn") {
      return res.status(400).json({
        message: "Region not valid, it must be: us, eu, tw, kr or cn",
      });
    }
    const affix = setAffixChannel.build({
      channelID: channelID,
      region: region,
      serverID: guildID,
    });
    const exists = await setAffixChannel.findOne({ serverID: guildID });
    if (exists == null) {
      await affix.save();
      return res
        .status(200)
        .json({ message: "Channel and region added successfully" });
    }
    if (exists.channelID != channelID) {
      return res.status(400).json({
        message:
          "Affixes channel already set. Unset the previous channel first. To add another region, " +
          "you have to do it in the channel where you set the affixes update.",
      });
    }
    if (!exists.region.includes(region)) {
      exists.region.push(region);
      await setAffixChannel.findByIdAndUpdate(
        { _id: exists._id },
        { region: exists.region },
        { useFindAndModify: false }
      );
      return res.status(200).json({ message: "Region added successfully" });
    } else {
      return res.status(400).json({
        message: "Region already registered.",
      });
    }
  }
);

export { router as setAffixes };
