import mongoose from "mongoose";

interface setAffixAttrs {
  serverID: number;
  channelID: number;
  region: string[];
}

interface setAffixModel extends mongoose.Model<setAffixDoc> {
  build(attrs: setAffixAttrs): setAffixDoc;
}

interface setAffixDoc extends mongoose.Document {
  serverID: string;
  channelID: string;
  region: string[];
}

const setSchema = new mongoose.Schema(
  {
    serverID: { type: String, required: true },
    channelID: { type: String, required: true },
    region: { type: Array, required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {},
    },
  }
);

setSchema.statics.build = (attrs: setAffixAttrs) => {
  return new affixChannel(attrs);
};
const affixChannel = mongoose.model<setAffixDoc, setAffixModel>(
  "SetAffixes",
  setSchema
);

export { affixChannel };
