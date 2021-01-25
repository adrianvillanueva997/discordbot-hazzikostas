import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { affixChannel } from "../models/AffixChannel";
import { regions } from "../models/Regions";

const router = express.Router();

router.delete(
  "/api/characters/deleteAffix",
  body("guildID").isString(),
  body("channelID").isString(),
  body("region").isString(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ errors: errors.array() }).status(400);
    }
    let { guildID, channelID, region } = req.body;
    if (!regions.includes(region)) {
      return res
        .send({
          message: "Region not valid, it must be: us, eu, tw, kr or cn",
        })
        .status(404);
    }
    const exists = await affixChannel.findOne({
      serverID: guildID,
      channelID: channelID,
    });
    if (exists == null) {
      return res
        .send({ message: "This server does not have any affix channel set." })
        .status(404);
    }
    if (exists.region.length == 1) {
      await affixChannel.findByIdAndDelete(
        { _id: exists._id },
        { useFindAndModify: false }
      );
      return res.send({ message: "Channel unset successfully" }).status(200);
    }
    if (exists.region.includes(region)) {
      const newRegionArr = exists.region.filter(function (value: number) {
        return value != region;
      });
      await affixChannel.findByIdAndUpdate(
        { _id: exists._id },
        { region: newRegionArr },
        { useFindAndModify: false }
      );
      return res.send({ message: "channel unset successfully." }).status(200);
    }
  }
);

export { router as unSetAffixes };
