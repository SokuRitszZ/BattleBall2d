import GameObject from "../base/GameObject";
import Game, {tagSendAct} from "../base/Game";
import C from "../utils/C";
import G from "../utils/G";
import {PlayerConfig, TypePosition} from "../types";
import Skill from "../skill/Skill";
import ShootFireBall from "../skill/ShootFireBall";
import Collisionable from "../interfaces";
import TargetMoveUpdater from "../updater/move/TargetMoveUpdater";
import ZoomUpdater from "../updater/effect/ZoomUpdater";
import pubsub from "pubsub-js";
import ShootMooney from "../skill/ShootMooney";
import Particle from "../skill/items/ball/Particle";

class Player extends GameObject implements Collisionable {
  config: PlayerConfig
  image?: HTMLImageElement

  position: TypePosition
  moveTarget: TypePosition = null;

  skills: Skill[] = [];
  HP: number;

  protected isAlive: Boolean = true;

  private handlers: any[] = [];

  constructor(root: Game, position: TypePosition, config: PlayerConfig) {
    super(root);
    root.players.push(this);

    this.position = position;
    this.config = config;
    if (!C.isHex(config.headIcon)) {
      this.image = new Image();
      this.image.src = config.headIcon;
    }

    this.HP = this.config.maxHP;
  }

  checkAttacked(): void {}

  afterAttacked(obj: any): void {
    const angle = C.angle(this.position, obj.position);
    let {x, y} = this.position!;
    x += this.config.radius * Math.cos(angle);
    y += this.config.radius * Math.sin(angle);
    const n = 5 + Math.floor(Math.random() * 10);
    for (let i = 0; i < n; ++i) {
      new Particle(this.root, {x, y}, {
        angle: Math.PI * 2 * Math.random(),
        color: "#ff0000",
        maxLen: 1 + 0.5 * Math.random(),
        maxRadius: 0.05,
        maxTime: 0.5,
        radius: 0.05
      });
    }
  }

  onStart() {
    /// skill
    this.skills.push(new ShootFireBall({
      cd: 3,
      key: "q",
      parent: this
    }));
    this.skills.push(new ShootMooney({
      cd: 1,
      key: "w",
      parent: this
    }));

    /// updater
    this.updaters.push(new TargetMoveUpdater(this, this.config.speed));

    this.addEventListener();
  }

  update() {
    super.update();
    this.render();
    this.checkIsDied();
  }

  onDestroy() {
    this.root.players = this.root.players.filter(player => this !== player);
    this.isAlive = false;

    this.handlers.forEach(([target, type, event]) => {
      target.removeEventListener(type, event);
    });
  }

  //MARK: Public Methods

  public setMoveTarget(position: TypePosition, isMultiMode: boolean = true) {
    if (isMultiMode) {
      let args = [...arguments];
      pubsub.publish(tagSendAct, {
        action: "play",
        act: "setMoveTarget",
        nanoid: this.nanoid,
        args: args,
        callback: () => this.setMoveTarget(position, false)
      });
      return ;
    }
    if (position) {
      this.moveTarget = {
        x: position.x,
        y: position.y
      };
    } else {
      this.moveTarget = null;
    }
  }

  public toUseSkill(index: number, target: TypePosition, isMultiMode: boolean = true) {
    if (isMultiMode) {
      let args = [...arguments];
      pubsub.publish(tagSendAct, {
        action: "play",
        act: "toUseSkill",
        nanoid: this.nanoid,
        args: args,
        callback: () => this.toUseSkill(index, target, false)
      });
      return ;
    }
    this.skills[index].use(target);
  }

  //MARK: Protected Methods

  protected checkIsDied() {
    if (this.HP <= 0 && this.isAlive) {
      this.isAlive = false;
      const vRadius = this.config.radius / 0.5;
      this.updaters.push(new ZoomUpdater(this, 0.5, radius => {
        return Math.max(0, radius - vRadius * this.deltaTime);
      }));
      setTimeout(() => {
        this.destroy();
      }, 500);
    }
  }

  protected render() {
    const {headIcon, radius} = this.config;
    const {x, y} = this.position!;
    const scale = this.root.scale;

    if (C.isHex(headIcon)) {
      // 纯色
      G.Circle({
        x: x * scale,
        y: y * scale,
        radius: radius * scale,
        color: `#${headIcon}`
      });
    } else if (this.image) {
      G.ClipCircle({
        x: x * scale,
        y: y * scale,
        radius: radius * scale,
        image: this.image
      });
    }
  }

  //MARK: Private Methods

  private addEventListener() {
    if (!this.config.isOperated) return ;
    // mousedown
    this.handlers.push([this.root.$canvas, "mousedown", (e: MouseEvent) => {
      if (!this.isAlive) return ;
      switch (e.button) {
        case 0:
          // 左键
          break;
        case 1:
          // 中键
          break;
        case 2:
          this.setMoveTarget({
            x: e.offsetX / this.root.scale,
            y: e.offsetY / this.root.scale
          });
          break;
        default:
          // 默认
          break;
      }
    }])
    /// keyup
    this.handlers.push([window, "keyup", (e: KeyboardEvent) => {
      this.skills.forEach((skill, index) => {
        if (!this.isAlive) return ;
        if (skill.checkIfUse(e.key)) {
          this.toUseSkill(index, this.root.cursorPosition);
          skill.use(this.root.cursorPosition);
        }
      });
    }]);

    this.handlers.forEach(([target, type, event]) => {
      target.addEventListener(type, event);
    });
  }
}

export default Player;
