import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import { add } from "./routes/add";
import { delete_ } from "./routes/delete";
import { routine } from "./routes/routine";
import { show } from "./routes/show";
import { unset } from "./routes/unsetCharacters";
import { set } from "./routes/setCharacters";
import { setAffixes } from "./routes/setAffix";
import { unSetAffixes } from "./routes/unsetAffix";
import { affixes } from "./routes/getAffixes";
import { AffixesJob } from "./routines/affixesRoutine";
import { raider } from "./services/raider";
import { CharacterJob } from "./routines/characterRoutine";

require("dotenv").config();
const app = express();
app.use(bodyParser.json());

app.use(add);
app.use(delete_);
app.use(routine);
app.use(show);
app.use(unset);
app.use(set);
app.use(setAffixes);
app.use(unSetAffixes);
app.use(affixes);

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb://${process.env.database_url}/hazzikostas`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
    console.log("Connected to Mongo");
  } catch (err) {
    console.log(err);
  }
  app.listen(3000, async () => {
    console.log("API listening on port 3000");
    AffixesJob.start();
    CharacterJob.start();
    // await raider.getCharacterData("us", "wyrmrest-accord", "Uwupolicia");
  });
};
start().then();
