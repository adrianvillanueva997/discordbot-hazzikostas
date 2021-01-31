import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { Character } from "../models/Character";

const router = express.Router();

router.delete(
  "/api/characters/delete/",
  body("toonName").isString(),
  body("realm").isString(),
  body("region").isString(),
  body("serverID").isString(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { toonName, realm, region, serverID } = req.body;
    const data = await Character.findOne({
      toonName: toonName,
      realm: realm,
      region: region,
    });
    if (data === null) {
      return res.send({ message: "Character does not exist" }).status(404);
    }
    if (data.serverID.length == 1) {
      await Character.findByIdAndDelete(
        { _id: data._id },
        { useFindAndModify: false }
      );
      return res
        .send({ message: "Character deleted successfully" })
        .status(200);
    }
    const newServerIDArr = data.serverID.filter(function (value: string) {
      return value != serverID;
    });
    await Character.findByIdAndUpdate(
      { _id: data._id },
      { serverID: newServerIDArr },
      { useFindAndModify: false }
    );
    return res.send({ message: "Character deleted successfully" }).status(200);
  }
);

export { router as delete_ };
