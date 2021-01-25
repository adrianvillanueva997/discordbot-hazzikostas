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
      return res.send({ errors: errors.array() }).status(400);
    }
    const { guildID, channelID } = req.body;
    const exists = await characterChannel.findOne({
      serverID: guildID,
      channelID: channelID,
    });
    if (exists == null) {
      return res.send({ message: "Server does not exist" }).status(404);
    }
    await characterChannel.findOneAndRemove(
      {
        serverID: guildID,
        channelID: channelID,
      },
      { useFindAndModify: false }
    );
    res.send({ message: "Channel unset successfully" }).status(200);
  }
);

export { router as unset };
