import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Character } from "../models/character";

const router = express.Router();

router.get(
  "/api/characters/show",
  body("guildID").isString(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { guildID } = req.body;
    const found = await Character.find({ serverID: guildID });
    if (found.length == 0) {
      res.status(404).json({ message: "No characters registered yet" });
      return;
    }
    res.status(200).json({ message: found });
    return;
  }
);

export { router as show };
