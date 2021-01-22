import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { affixChannel } from "../models/AffixChannel";

const router = express.Router();

router.delete(
  "/api/characters/deleteAffix",
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
      return res.status(404).json({
        message: "Region not valid, it must be: us, eu, tw, kr or cn.",
      });
    }
    const exists = await affixChannel.findOne({
      serverID: guildID,
      channelID: channelID,
    });
    if (exists == null) {
      return res
        .status(404)
        .json({ message: "This server does not have any affix channel set." });
    }
    if (exists.region.length == 1) {
      await affixChannel.findByIdAndDelete(
        { _id: exists._id },
        { useFindAndModify: false }
      );
      return res.status(200).json({ message: "Channel unset successfully" });
    }
    if (exists.region.contains(region)) {
      const newRegionArr = exists.region.filter(function (
        value: number,
        index: number,
        arr: any
      ) {
        return value != region;
      });
      await affixChannel.findByIdAndUpdate(
        { _id: exists._id },
        { region: newRegionArr },
        { useFindAndModify: false }
      );
      return res.status(200).json({ message: "channel unset successfully." });
    }
  }
);

export { router as unSetAffixes };
