import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { affixes } from "../models/Affixes";
import { affixChannel } from "../models/AffixChannel";
import sanitize from "mongo-sanitize";

const router = express.Router();

router.get(
  "/api/affixes",
  body("region").isString(),
  body("locale").isString(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ errors: errors.array() }).status(400);
    }
    let { region } = req.body;
    region = sanitize(region);
    const regionClean = sanitize(region);
    const affix = await affixes.findOne({ region: regionClean });
    const servers = await affixChannel.find({ region: regionClean });
    return res.send({ affixes: affix, servers: servers }).status(200);
  }
);

export { router as affixes };
