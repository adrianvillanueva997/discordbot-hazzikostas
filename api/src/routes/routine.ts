import express, { Request, Response } from "express";
import { Character } from "../models/Character";

const router = express.Router();

router.get("/api/characters/routine", async (req: Request, res: Response) => {
  const characters = await Character.find({ postStatus: 1 });
  return res.send(characters).status(200);
});

export { router as routine };
