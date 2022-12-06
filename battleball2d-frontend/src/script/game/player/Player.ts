import GameObject from "../base/GameObject";
import Game from "../base/Game";
import C from "../utils/C";
import G from "../utils/G";
import {PlayerConfig, TypePosition} from "../types";
import Skill from "../skill/Skill";
import ShootFireBall from "../skill/ShootFireBall";
import Collisionable from "../interfaces";
import TargetMoveUpdater from "../updater/move/TargetMoveUpdater";
import ZoomUpdater from "../updater/effect/ZoomUpdater";

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

  afterAttacked(): void {}

  onStart() {
    /// skill
    this.skills.push(new ShootFireBall({
      cd: 3,
      key: "q",
      parent: this
    }))

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

  public setMoveTarget(position: TypePosition) {
    const scale = this.root.scale;
    if (position) {
      this.moveTarget = {
        x: position.x / scale,
        y: position.y / scale
      };
    } else {
      this.moveTarget = null;
    }
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
            x: e.offsetX,
            y: e.offsetY
          });
          break;
        default:
          // 默认
          break;
      }
    }])
    /// keyup
    this.handlers.push([window, "keyup", (e: KeyboardEvent) => {
      this.skills.forEach(skill => {
        if (!this.isAlive) return ;
        if (skill.checkIfUse(e.key)) {
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
