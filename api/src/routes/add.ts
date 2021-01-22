import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { Character } from "../models/Character";

const router = express.Router();

router.post(
  "/api/characters/add",
  body("toonName").isString(),
  body("realm").isString(),
  body("region").isString(),
  body("serverID").isNumeric(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { toonName, realm, region, serverID } = req.body;
    const character = Character.build({
      toonName: toonName,
      realm: realm,
      region: region,
      serverID: serverID,
    });
    const characterExists = await Character.findOne({
      toonName: toonName,
      realm: realm,
      region: region,
    });
    if (characterExists === null) {
      await character.save();
      res.sendStatus(200);
      return;
    }
    const serverIDs = characterExists.serverID;
    if (serverIDs.includes(serverID)) {
      res.status(400).json({ message: "Character already exists" });
      return;
    }
    characterExists.serverID.push(serverID);
    console.log(characterExists.serverID);
    await Character.findByIdAndUpdate(
      { _id: characterExists.id },
      { serverID: characterExists.serverID },
      { useFindAndModify: false }
    );
    res.sendStatus(200);
  }
);

export { router as add };
