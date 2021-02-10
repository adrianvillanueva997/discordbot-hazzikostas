import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Character } from "../models/Character";
import sanitize = require("mongo-sanitize");

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
    let { toonName, realm, region } = req.body;
    toonName = sanitize(toonName);
    realm = sanitize(realm);
    region = sanitize(region);
    const exists = await Character.findOne({
      realm: realm,
      region: region,
      toonName: toonName,
    });
    if (exists != null) {
      await Character.findByIdAndUpdate(
        exists._id,
        { postStatus: 0 },
        { useFindAndModify: false }
      );
      return res.send({}).status(200);
    }
    return res.send({}).status(404);
  }
);

export { router as updateStatus };
