import mongoose from "mongoose";

interface CharacterAttrs {
  toonName: string;
  realm: string;
  region: string;
  serverID: string[];
}

interface CharacterModel extends mongoose.Model<CharacterDoc> {
  build(attrs: CharacterAttrs): CharacterDoc;
}

export interface CharacterDoc extends mongoose.Document {
  toonName: string;
  realm: string;
  region: string;
  serverID: string[];
  spec: string;
  race: string;
  class: string;
  role: string;
  faction: string;
  thumbnailUrl: string;
  profileUrl: string;
  all: number;
  dps: number;
  healer: number;
  tank: number;
  spec0: number;
  spec1: number;
  spec2: number;
  spec3: number;
  rankOverall: number;
  rankClass: number;
  rankFaction: number;
  allDif: number;
  dpsDif: number;
  healerDif: number;
  tankDif: number;
  spec0Dif: number;
  spec1Dif: number;
  spec2Dif: number;
  spec3Dif: number;
  rankOverallDif: number;
  rankClassDif: number;
  rankFactionDif: number;
}

const characterSchema = new mongoose.Schema(
  {
    toonName: {
      type: String,
      required: true,
    },
    realm: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    serverID: {
      type: Array,
      required: true,
    },
    spec: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: false,
    },
    race: {
      type: String,
      required: false,
    },
    class: {
      type: String,
      required: false,
    },
    thumbnailUrl: {
      type: String,
      required: false,
    },
    profileUrl: {
      type: String,
      required: false,
    },
    all: {
      type: Number,
      required: false,
    },
    dps: {
      type: Number,
      required: false,
    },
    healer: {
      type: Number,
      required: false,
    },
    tank: {
      type: Number,
      required: false,
    },
    spec0: {
      type: Number,
      required: false,
    },
    spec1: {
      type: Number,
      required: false,
    },
    spec2: {
      type: Number,
      required: false,
    },
    spec3: {
      type: Number,
      required: false,
    },
    rankOverall: {
      type: Number,
      required: false,
    },
    rankClass: {
      type: Number,
      required: false,
    },
    rankFaction: {
      type: Number,
      required: false,
    },
    allDif: {
      type: Number,
      required: false,
    },
    dpsDif: {
      type: Number,
      required: false,
    },
    healerDif: {
      type: Number,
      required: false,
    },
    spec0Dif: {
      type: Number,
      required: false,
    },
    spec2Dif: {
      type: Number,
      required: false,
    },
    spec3Dif: {
      type: Number,
      required: false,
    },
    rankOverallDif: {
      type: Number,
      required: false,
    },
    rankClassDif: {
      type: Number,
      required: false,
    },
    rankFactionDif: {
      type: Number,
      required: false,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {},
    },
  }
);

characterSchema.statics.build = (attrs: CharacterAttrs) => {
  return new Character(attrs);
};
const Character = mongoose.model<CharacterDoc, CharacterModel>(
  "Characters",
  characterSchema
);

export { Character };
