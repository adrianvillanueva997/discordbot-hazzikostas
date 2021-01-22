import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { characterChannel } from "../models/CharacterChannel";

const router = express.Router();

router.post(
  "/api/characters/set",
  body("serverID").isNumeric(),
  body("channelID").isNumeric(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { guildID, channelID } = req.body;
    const setChannel = characterChannel.build({
      serverID: guildID,
      channelID: channelID,
    });
    const exists = await characterChannel.findOne({
      guildID: guildID,
      channelID: channelID,
    });
    if (exists === null) {
      await setChannel.save();
      res.sendStatus(200);
      return;
    }
    res.send("Server does not exist").status(400);
  }
);

export { router as set };
