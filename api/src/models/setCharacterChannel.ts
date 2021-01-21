import mongoose from "mongoose";

interface setAttrs {
  serverID: number;
  channelID: number;
}

interface setModel extends mongoose.Model<setDoc> {
  build(attrs: setAttrs): setDoc;
}

interface setDoc extends mongoose.Document {
  serverID: number;
  channelID: number;
}

const setSchema = new mongoose.Schema(
  {
    serverID: { type: Number, required: true },
    channelID: { type: Number, required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {},
    },
  }
);

setSchema.statics.build = (attrs: setAttrs) => {
  return new setCharacterChannel(attrs);
};
const setCharacterChannel = mongoose.model<setDoc, setModel>(
  "SetCharacters",
  setSchema
);

export { setCharacterChannel };
