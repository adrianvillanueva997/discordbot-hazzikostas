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

interface CharacterDoc extends mongoose.Document {
  toonName: string;
  realm: string;
  region: string;
  serverID: string[];
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

export { Character, CharacterDoc };
