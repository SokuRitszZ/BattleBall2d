import Player from "./player/Player";

export type GameMapConfig = {
  widthRatio: number;
  heightRatio: number;
};

export type ModeEnum = "unknown" | "single" | "multi";

export type SkillConfig = {
  parent: Player
  key: string
  cd: number
};


export type TypePosition = {
  x: number
  y: number
} | null;

export type PlayerConfig = {
  maxHP: number
  headIcon: string
  radius: number
  speed: number
  isOperated: Boolean
};

export type CircleConfig = {
  config: {
    radius: number
  }
  position: TypePosition
};