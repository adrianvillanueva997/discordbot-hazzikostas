import axios from "axios";

export class raider {
  constructor() {}

  static async getAffixes(region: string, locale: string): Promise<any> {
    return await axios
      .get(
        `https://raider.io/api/v1/mythic-plus/affixes&region=${region}&locale=${locale}`
      )
      .then((r) => {
        console.log(r.data);
      });
  }

  async getCharacterData() {}
}
