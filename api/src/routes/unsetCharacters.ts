import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { characterChannel } from "../models/CharacterChannel";

const router = express.Router();

router.delete(
  "/api/characters/unset",
  body("serverID").isNumeric(),
  body("channelID").isNumeric(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { guildID, channelID } = req.body;
    const exists = await characterChannel.findOne({
      serverID: guildID,
      channelID: channelID,
    });
    if (exists == null) {
      res.status(400).json({ message: "Server does not exist" });
      return;
    }
    await characterChannel.findOneAndRemove(
      {
        serverID: guildID,
        channelID: channelID,
      },
      { useFindAndModify: false }
    );
    res.sendStatus(200);
  }
);

export { router as unset };
