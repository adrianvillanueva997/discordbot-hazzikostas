import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { characterChannel } from "../models/CharacterChannel";
import sanitize from "mongo-sanitize";

const router = express.Router();

router.delete(
  "/api/characters/unsetcharacterchannel",
  body("serverID").isNumeric(),
  body("channelID").isNumeric(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ errors: errors.array() }).status(400);
    }
    let { serverID, channelID } = req.body;
    serverID = sanitize(serverID);
    channelID = sanitize(channelID);
    const exists = await characterChannel.findOne({
      serverID: serverID,
      channelID: channelID,
    });
    if (exists == null) {
      return res
        .send({ message: "Server does not have any channel assigned" })
        .status(404);
    }
    await characterChannel.findOneAndRemove(
      {
        serverID: serverID,
        channelID: channelID,
      },
      { useFindAndModify: false }
    );
    res.send({ message: "Channel unset successfully" }).status(200);
  }
);

export { router as unset };
