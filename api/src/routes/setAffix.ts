import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { affixChannel } from "../models/AffixChannel";

const router = express.Router();

router.post(
  "/api/characters/setAffix",
  body("guildID").isString(),
  body("channelID").isString(),
  body("region").isString(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ errors: errors.array() }).status(400);
    }
    let { guildID, channelID, region } = req.body;
    region = region.lowercase;
    if (region != "us" || "eu" || "tw" || "kr" || "cn") {
      return res
        .send({
          message: "Region not valid, it must be: us, eu, tw, kr or cn",
        })
        .status(404);
    }
    const affix = affixChannel.build({
      channelID: channelID,
      region: region,
      serverID: guildID,
    });
    const exists = await affixChannel.findOne({ serverID: guildID });
    if (exists == null) {
      await affix.save();
      return res
        .send({ message: "Channel and region added successfully" })
        .status(200);
    }
    if (exists.channelID != channelID) {
      return res
        .send({
          message:
            "Affixes channel already set. Unset the previous channel first. To add another region, " +
            "you have to do it in the channel where you set the affixes update.",
        })
        .status(400);
    }
    if (!exists.region.includes(region)) {
      exists.region.push(region);
      await affixChannel.findByIdAndUpdate(
        { _id: exists._id },
        { region: exists.region },
        { useFindAndModify: false }
      );
      return res.send({ message: "Region added successfully" }).status(200);
    } else {
      return res
        .send({
          message: "Region already registered.",
        })
        .status(400);
    }
  }
);

export { router as setAffixes };
