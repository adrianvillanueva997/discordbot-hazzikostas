import axios from "axios";

export class raider {
  constructor() {}

  static async getAffixes(region: string, locale: string): Promise<any> {
    return await axios
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
  }

  async getCharacterData() {}
}
