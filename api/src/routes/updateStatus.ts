import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Character } from "../models/Character";

const router = express.Router();
router.post(
  "/api/characters/updateStatus",
  body("toonName").isString(),
  body("realm").isString(),
  body("region").isString(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ errors: errors.array() }).status(400);
    }
    const { toonName, realm, region } = req.body;
    console.log(toonName, realm, region);
    const exists = await Character.findOne({
      realm: realm,
      region: region,
      toonName: toonName,
    });
    await Character.findByIdAndUpdate(
      exists._id,
      { postStatus: 0 },
      { useFindAndModify: false }
    );
    return res.send({}).status(200);
  }
);

export { router as updateStatus };
