import express, { Request, Response } from "express";
import { regions } from "../models/Regions";

const router = express.Router();

router.get("/api/regions", async (req: Request, res: Response) => {
  return res.send({ regions: regions }).status(200);
});

export { router as regions_r };
