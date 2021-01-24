import axios from "axios";
import { Affixes } from "../models/Affixes";
import { CharacterDoc } from "../models/Character";

class Raider {
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

  static async getCharacterData(region: string, realm: string, name_: string) {
    const data = await axios
      .get(
        `https://raider.io/api/v1/characters/profile?region=${region}&realm=${realm}&name=${name_}&fields=mythic_plus_ranks,mythic_plus_scores_by_season:current`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((r) => {
        return r.data;
      });
    return {
      toonName: data.name,
      race: data.race,
      spec: data.active_spec_name,
      role: data.active_spec_role,
      faction: data.faction,
      thumbnailUrl: data.thumbnail_url,
      region: data.region,
      realm: data.realm,
      profileUrl: data.profile_url,
      all: data.mythic_plus_scores_by_season[0].scores.all,
      dps: data.mythic_plus_scores_by_season[0].scores.dps,
      healer: data.mythic_plus_scores_by_season[0].scores.healer,
      tank: data.mythic_plus_scores_by_season[0].scores.tank,
      spec0: data.mythic_plus_scores_by_season[0].scores.spec_0,
      spec1: data.mythic_plus_scores_by_season[0].scores.spec_1,
      spec2: data.mythic_plus_scores_by_season[0].scores.spec_2,
      spec3: data.mythic_plus_scores_by_season[0].scores.spec_3,
      rankClass: data.mythic_plus_ranks.class.realm,
      rankFaction: data.mythic_plus_ranks.faction_class.realm,
      rankOverall: data.mythic_plus_ranks.overall.realm,
    } as CharacterDoc;
  }
}

export { Raider };
