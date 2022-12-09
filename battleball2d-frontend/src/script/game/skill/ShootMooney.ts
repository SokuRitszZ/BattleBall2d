import Skill from "./Skill";
import {SkillConfig, TypePosition} from "../types";
import Mooney from "./items/ball/Mooney";
import C from "../utils/C";

class ShootMooney extends Skill {
  damage: number;

  constructor(config: SkillConfig, damage?: number) {
    super(config);

    this.damage = damage || 11;
  }

  use(target: TypePosition) {
    if (!this.checkIfCanUse()) return ;
    const parent = this.config.parent;
    const root = parent.root;
    const angle = C.angle(parent.position, target);
    this.setLastUsed(new Date());

    new Mooney(root, parent, parent.position, {
      angle: angle,
      color: "#330000",
      damage: 5,
      maxLength: 20,
      parent: parent,
      radius: 0.1,
      speed: 4
    });
  }
}

export default ShootMooney;