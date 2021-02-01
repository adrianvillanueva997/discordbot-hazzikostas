import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Character } from "../models/Character";

const router = express.Router();

router.post(
  "/api/characters/updateStatus",
  body("toonName").isString(),
  body("realm").isString(),
  body("region").isString,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ errors: errors.array() }).status(400);
    }
    const { toonName, realm, region } = req.body;
    await Character.findOneAndUpdate(
      {
        toonName: toonName,
        region: region,
        realm: realm,
      },
      { postStatus: 0 },
      { useFindAndModify: false }
    );
    return res.sendStatus(200);
  }
);

export { router as updateStatus };
