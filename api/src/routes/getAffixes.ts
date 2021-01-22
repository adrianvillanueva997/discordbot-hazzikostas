import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { raider } from "../services/raider";

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
    const { region, locale } = req.body;
    const affixesData = await raider.getAffixes(region, locale);
    res.status(200).json({ message: affixesData });
  }
);

export { router as affixes };
