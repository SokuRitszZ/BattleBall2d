import {SkillConfig, TypePosition} from "../types";

class Skill {
  config: SkillConfig;
  lastUsed: Date = new Date();

  protected constructor(config: SkillConfig, ...args: any) {
    this.config = config;
  }

  checkIfUse(key: string) {
    return this.config.key === key;
  }

  setLastUsed(lastUsed: Date) {
    this.lastUsed = lastUsed;
  }

  checkIfCanUse() {
    const now = new Date();
    return +now - +this.lastUsed >= this.config.cd * 1000;
  }

  // 使用技能
  use(target: TypePosition) {
  }
}

export default Skill;