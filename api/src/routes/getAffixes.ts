import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { affixes } from "../models/Affixes";

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
    const { region } = req.body;
    const affix = affixes.findOne({ region: region });
    return res.send({ message: affix }).status(200);
  }
);

export { router as affixes };
