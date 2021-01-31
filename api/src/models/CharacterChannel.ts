import mongoose from "mongoose";

interface characterChannelAttrs {
  serverID: string;
  channelID: string;
}

interface setModel extends mongoose.Model<setDoc> {
  build(attrs: characterChannelAttrs): setDoc;
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

setSchema.statics.build = (attrs: characterChannelAttrs) => {
  return new characterChannel(attrs);
};
const characterChannel = mongoose.model<setDoc, setModel>(
  "SetCharacters",
  setSchema
);

export { characterChannel, characterChannelAttrs };
