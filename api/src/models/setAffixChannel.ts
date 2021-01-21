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
    serverID: number;
    channelID: number;
    region: string[];
}

const setSchema = new mongoose.Schema(
    {
        serverID: {type: Number, required: true},
        channelID: {type: Number, required: true},
        region: {type: Array, required: true}
    },
    {
        toJSON: {
            transform(doc, ret) {
            },
        },
    }
);

setSchema.statics.build = (attrs: setAffixAttrs) => {
    return new setAffixChannel(attrs);
};
const setAffixChannel = mongoose.model<setAffixDoc, setAffixModel>(
    "SetAffixes",
    setSchema
);

export {setAffixChannel};
