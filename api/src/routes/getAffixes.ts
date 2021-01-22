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
      return res.status(400).json({ errors: errors.array() });
    }
    const { region } = req.body;
    const affix = affixes.findOne({ region: region });
    return res.status(200).json({ message: affix });
  }
);

export { router as affixes };
