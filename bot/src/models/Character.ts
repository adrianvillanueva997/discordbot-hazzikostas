interface Character {
  toonName: string;
  region: string;
  realm: string;
  serverID: string;
}

interface CharacterRoutine {
  toonName: string;
  realm: string;
  region: string;
  _class: string;
  serverID: string[];
  spec: string;
  race: string;
  role: string;
  faction: string;
  thumbnailUrl: string;
  profileUrl: string;
  all: number;
  dps: number;
  healer: number;
  tank: number;
  spec0: number;
  spec1: number;
  spec2: number;
  spec3: number;
  rankOverall: number;
  rankClass: number;
  rankFaction: number;
  allDif: number;
  dpsDif: number;
  healerDif: number;
  tankDif: number;
  spec0Dif: number;
  spec1Dif: number;
  spec2Dif: number;
  spec3Dif: number;
  rankOverallDif: number;
  rankClassDif: number;
  rankFactionDif: number;
  postStatus: number;
  warning: string;
}

export { Character, CharacterRoutine };
