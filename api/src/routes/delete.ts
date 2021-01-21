import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { Character } from "../models/character";

const router = express.Router();

router.delete(
  "/api/characters/delete",
  body("toonName").isString(),
  body("realm").isString(),
  body("region").isString(),
  body("serverID").isNumeric(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { toonName, realm, region, serverID } = req.body;
    const data = await Character.findOne({
      toonName: toonName,
      realm: realm,
      region: region,
      serverID: serverID,
    });
    if (data === null) {
      res.status(400).json({ message: "Character does not exist" });
      return;
    }
    if (data.serverID.length == 1) {
      await Character.findByIdAndDelete(
        { _id: data._id },
        { useFindAndModify: false }
      );
      res.status(200).json({ message: "Ok" });
      return;
    }
    const newServerIDArr = data.serverID.filter(function (
      value: number,
      index: number,
      arr: any
    ) {
      return value != serverID;
    });
    console.log(data.serverID);
    console.log(newServerIDArr);
    await Character.findByIdAndUpdate(
      { _id: data._id },
      { serverID: newServerIDArr },
      { useFindAndModify: false }
    );
    res.status(200).json({ message: "Ok" });
  }
);

export { router as delete_ };
