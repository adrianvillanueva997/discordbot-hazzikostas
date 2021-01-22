import axios from "axios";
import { Affixes } from "../models/Affixes";

export class raider {
  constructor() {}

  static async getAffixes(region: string, locale: string): Promise<Affixes> {
    const { title, affix_details } = await axios
      .get(
        `https://raider.io/api/v1/mythic-plus/affixes?region=${region}&locale=${locale}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((r) => {
        return r.data;
      });
    return { region: region, title: title, details: affix_details } as Affixes;
  }

  async getCharacterData() {}
}
