import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Character } from "../models/Character";
import sanitize from "mongo-sanitize";

const router = express.Router();

router.get(
  "/api/characters/show",
  body("guildID").isString(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let { guildID } = req.body;
    guildID = sanitize(guildID);
    const found = await Character.find({ serverID: guildID });
    if (found.length == 0) {
      res.send({ message: "No characters registered yet" }).status(404);
      return;
    }
    res.send({ message: found }).status(200);
    return;
  }
);

export { router as show };
