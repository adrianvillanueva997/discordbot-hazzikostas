import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import { characterChannel } from "../models/CharacterChannel";
import sanitize from "mongo-sanitize";

const router = Router();

router.get(
  "/api/characters/getCharacterChannel",
  body("serverID").isString(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ errors: errors.array() }).status(400);
    }
    let { serverID } = req.body;
    serverID = sanitize(serverID);
    const serverIDClean = sanitize(serverID);
    const channel = await characterChannel.findOne({
      serverID: serverIDClean,
    });
    if (channel == null || channel == undefined) {
      return res.send({ message: "Server does not exist" }).status(404);
    }
    return res.send(channel).status(200);
  }
);

export { router as getCharacterChannel };
