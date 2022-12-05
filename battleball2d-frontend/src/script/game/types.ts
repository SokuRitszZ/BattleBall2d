import Player from "./player/Player";

export type GameMapConfig = {
  widthRatio: number;
  heightRatio: number;
};

export type ModeEnum = "unknown" | "single" | "multi";

export type ParticleConfig = {
  maxLen: number
  maxTime: number
  angle: number
  maxRadius: number
  color: string
};

export type SkillConfig = {
  parent: Player
  key: string
  cd: number
};

export type BallConfig = {
  color?: string
  radius: number
  speed: number
  angle: number
  parent: Player
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