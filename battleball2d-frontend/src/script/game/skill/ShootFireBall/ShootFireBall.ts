import Skill from "../Skill";
import {SkillConfig, TypePosition} from "../../types";
import Ball from "../items/ball/Ball";
import C from "../../utils/C";
import FireBall from "../items/ball/FireBall";

class ShootFireBall extends Skill {
  damage: number;

  constructor(config: SkillConfig, damage?: number) {
    super(config);

    this.damage = damage || 9;
  }

  use(target: TypePosition): void {
    const parent = this.config.parent;
    const root = parent.root;

    new FireBall(
      root,
      parent,
      parent.position!,
      C.angle(parent.position!, target!),
      this.damage
    );
  }
}

export default ShootFireBall;