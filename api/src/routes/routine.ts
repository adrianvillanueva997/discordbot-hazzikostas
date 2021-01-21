import express from "express";

const router = express.Router();

router.get("/api/characters/routine", (req, res) => {
  res.send("patata");
});

export { router as routine };
