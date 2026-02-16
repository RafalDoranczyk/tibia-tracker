export type TibiaDataCharacterResponse = {
  character: TibiaDataCharacter;
  information: ApiInformation;
};

export type TibiaDataCharacter = {
  account_badges?: AccountBadge[];
  account_information?: AccountInformation;
  achievements?: Achievement[];
  character: CharacterDetails;
  deaths?: Death[];
  deaths_truncated?: boolean;
  other_characters?: OtherCharacter[];
};

type AccountBadge = {
  description: string;
  icon_url: string;
  name: string;
};

type AccountInformation = {
  created: string;
  loyalty_title?: string;
  position?: string;
};

type Achievement = {
  grade: number;
  name: string;
  secret: boolean;
};

type Vocation =
  | "none"
  | "Sorcerer"
  | "Druid"
  | "Paladin"
  | "Knight"
  | "Master Sorcerer"
  | "Elder Druid"
  | "Royal Paladin"
  | "Elite Knight";

type CharacterDetails = {
  account_status: string;
  achievement_points: number;
  comment?: string;
  deletion_date?: string;
  former_names?: string[];
  former_worlds?: string[];
  guild?: GuildInfo;
  houses?: House[];
  last_login?: string;
  level: number;
  married_to?: string;
  name: string;
  position?: string;
  residence: string;
  sex: string;
  title?: string;
  traded: boolean;
  unlocked_titles?: number;
  vocation: Vocation;
  world: string;
};

type GuildInfo = {
  name: string;
  rank: string;
};

type House = {
  houseid: number;
  name: string;
  paid: string;
  town: string;
};

type Death = {
  assists: DeathEntity[];
  killers: DeathEntity[];
  level: number;
  reason: string;
  time: string;
};

type DeathEntity = {
  name: string;
  player: boolean;
  summon: string;
  traded: boolean;
};

type OtherCharacter = {
  deleted: boolean;
  main: boolean;
  name: string;
  position?: string;
  status: "online" | "offline" | string;
  traded: boolean;
  world: string;
};

type ApiInformation = {
  api: {
    commit: string;
    release: string;
    version: number;
  };
  status: {
    error: number;
    http_code: number;
    message: string;
  };
  tibia_urls: string[];
  timestamp: string;
};
