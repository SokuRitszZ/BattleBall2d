import Skill from "./Skill";
import {SkillConfig, TypePosition} from "../types";
import Ball from "./items/ball/Ball";
import C from "../utils/C";
import FireBall from "./items/ball/FireBall";

class ShootFireBall extends Skill {
  damage: number;

  constructor(config: SkillConfig, damage?: number) {
    super(config);

    this.damage = damage || 9;
  }

  use(target: TypePosition): void {
    if (!this.checkIfCanUse()) return ;
    const parent = this.config.parent;
    const root = parent.root;
    this.setLastUsed(new Date());

    new FireBall(
      root,
      parent,
      {...parent.position!},
      {
        angle: C.angle(parent.position, target),
        damage: this.damage,
        maxLength: 15,
        parent,
        radius: 0.15,
        speed: 5,
        color: "#e3ac72"
      }
    );
  }
}

export default ShootFireBall;