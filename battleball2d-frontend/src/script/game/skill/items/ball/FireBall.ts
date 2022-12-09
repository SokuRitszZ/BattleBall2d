import Ball, {BallConfig} from "./Ball";
import Game from "../../../base/Game";
import {CircleConfig, TypePosition} from "../../../types";
import Collisionable from "../../../interfaces";
import C from "../../../utils/C";
import Player from "../../../player/Player";
import Particle from "./Particle";
import Spark from "./Spark";
import DirectMoveUpdater from "../../../updater/move/DirectMoveUpdater";

class FireBall extends Ball implements Collisionable {
  constructor(root: Game, parent: Player, position: TypePosition, config: BallConfig) {
    super(root, position, config);
  }

  onStart() {
    this.updaters.push(new DirectMoveUpdater(this, {
      angle: this.config.angle,
      disappearIfEnd: true,
      maxLength: this.config.maxLength,
      speed: this.config.speed
    }));
  }

  update() {
    super.update();
    this.checkAttacked();
    const {x, y} = this.position!;
    const angle = this.config.angle;
    new Spark(this.root, {
      x: x + 1 * this.config.radius * Math.cos(angle),
      y: y + 1 * this.config.radius * Math.sin(angle)
    }, {
      color: "#e3ac72",
      radius: this.config.radius,
      time: 0.15
    });
  }

  afterAttacked(params?: any): void {
    this.destroy();
  }

  checkAttacked(): void {
    for (let gameObject of this.root.gameObjects) {
      if (!('afterAttacked' in gameObject)) continue ;
      if (gameObject === this) continue ;
      if (gameObject === this.config.parent) continue ;
      if (!C.isCollision(this, gameObject as unknown as CircleConfig)) continue ;
      if (gameObject instanceof Player) gameObject.HP -= this.config.damage!;
      (gameObject as unknown as Collisionable).afterAttacked(this);
      this.afterAttacked(gameObject);
      return ;
    }
  }

  onDestroy() {
    for (let i = 0; i < 10; ++i) {
      const angle = Math.PI * 2 * Math.random();
      const len = Math.random() * 2 + 0.5;
      new Particle(this.root, this.position, {
        radius: 0.07,
        angle,
        color: this.config.color || "#129090",
        maxLen: len,
        maxRadius: 0.07,
        maxTime: 0.5
      });
    }
  }
}

export default FireBall;