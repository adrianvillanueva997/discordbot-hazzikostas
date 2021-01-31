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
      console.error(errors.array());
      return res.send({ errors: errors.array() }).status(400);
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
      return res.send({ message: "Character added successfully" }).status(200);
    }
    const serverIDs = characterExists.serverID;
    if (serverIDs.includes(serverID)) {
      return res.send({ message: "Character already registered" }).status(400);
    }
    characterExists.serverID.push(serverID);
    await Character.findByIdAndUpdate(
      { _id: characterExists.id },
      { serverID: characterExists.serverID },
      { useFindAndModify: false }
    );
    return res.send({ message: "Character added successfully" }).status(200);
  }
);

export { router as add };
