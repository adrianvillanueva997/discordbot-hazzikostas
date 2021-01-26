import mongoose from "mongoose";

interface setAttrs {
  serverID: string;
  channelID: string;
}

interface setModel extends mongoose.Model<setDoc> {
  build(attrs: setAttrs): setDoc;
}

interface setDoc extends mongoose.Document {
  serverID: string;
  channelID: string;
}

const setSchema = new mongoose.Schema(
  {
    serverID: { type: String, required: true },
    channelID: { type: String, required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {},
    },
  }
);

setSchema.statics.build = (attrs: setAttrs) => {
  return new characterChannel(attrs);
};
const characterChannel = mongoose.model<setDoc, setModel>(
  "SetCharacters",
  setSchema
);

export { characterChannel };
