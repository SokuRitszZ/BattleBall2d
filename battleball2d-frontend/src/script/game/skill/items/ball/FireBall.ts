import Ball from "./Ball";
import Game from "../../../base/Game";
import {CircleConfig, TypePosition} from "../../../types";
import Collisionable from "../../interfaces";
import C from "../../../utils/C";
import Player from "../../../player/Player";

class FireBall extends Ball implements Collisionable {
  damage: number;

  constructor(root: Game, parent: Player, position: TypePosition, angle: number, damage: number) {
    super(root, position, {
      parent: parent,
      radius: 0.15,
      speed: 5,
      color: "#e3ac72",
      angle: angle
    });
    this.damage = damage;
  }

  update() {
    this.checkAttacked();
    super.update();
  }

  afterAttacked(): void {
    this.destroy();
  }

  checkAttacked(): void {
    for (let gameObject of this.root.gameObjects) {
      if (!('afterAttacked' in gameObject)) continue ;
      if (gameObject === this) continue ;
      if (gameObject === this.config.parent) continue ;
      if (!C.isCollision(this, gameObject as unknown as CircleConfig)) continue ;
      this.destroy();
      if (gameObject instanceof Player) gameObject.HP -= this.damage;
      (gameObject as unknown as Collisionable).afterAttacked();
      return ;
    }
  }
}

export default FireBall;