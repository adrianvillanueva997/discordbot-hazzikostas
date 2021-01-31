import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import { characterChannel, characterChannelAttrs } from "../models/CharacterChannel";

const router = Router();

router.get(
	"/api/characters/getCharacterChannel",
	body("serverID").isString(),
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.send({ errors: errors.array() }).status(400);
		}
		const { serverID } = req.body;
		const channel: characterChannelAttrs = await characterChannel.findOne({
			serverID: serverID,
		});
		if (channel == null || channel == undefined) {
			return res.send({ message: "Server does not exist" }).status(404);
		}
		return res.send(channel).status(200);
	}
);

export { router as getCharacterChannel };
