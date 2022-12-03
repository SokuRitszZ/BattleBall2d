import Player from "./player/Player";

type GameMapConfig = {
  widthRatio: number;
  heightRatio: number;
};

type SkillConfig = {
  parent: Player
  key: string
};

type BallConfig = {
  color?: string
  radius: number
  speed: number
  angle: number
  parent: Player
};

type TypePosition = {
  x: number
  y: number
} | null;

type PlayerConfig = {
  maxHP: number
  headIcon: string
  radius: number
  speed: number
  isOperated: Boolean
};

type CircleConfig = {
  config: {
    radius: number
  }
  position: TypePosition
};

export type {
  TypePosition,
  SkillConfig,
  BallConfig,
  GameMapConfig,
  PlayerConfig,
  CircleConfig
};