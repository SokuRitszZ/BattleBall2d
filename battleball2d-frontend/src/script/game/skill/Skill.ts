import {SkillConfig, TypePosition} from "../types";

abstract class Skill {
  config: SkillConfig;

  protected constructor(config: SkillConfig, ...args: any) {
    this.config = config;
  }

  checkIfUse(key: string) {
    return this.config.key === key;
  }

  // 使用技能
  abstract use(target: TypePosition): void;
}

export default Skill;