import mongoose from "mongoose";

export interface Affixes {
  region: string;
  title: string;
  details: string[];
}

interface AffixesModel extends mongoose.Model<AffixesDoc> {
  build(attrs: Affixes): AffixesDoc;
}

interface AffixesDoc extends mongoose.Document {
  region: string;
  title: string;
  details: string[];
}

const AffixesSchema = new mongoose.Schema(
  {
    region: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    details: {
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

AffixesSchema.statics.build = (attrs: Affixes) => {
  return new affixes(attrs);
};
const affixes = mongoose.model<AffixesDoc, AffixesModel>(
  "Affixes",
  AffixesSchema
);

export { affixes };
