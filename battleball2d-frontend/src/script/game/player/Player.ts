import GameObject from "../base/GameObject";
import Game from "../base/Game";
import C from "../utils/C";
import G from "../utils/G";
import {PlayerConfig, TypePosition} from "../types";
import Skill from "../skill/Skill";
import ShootFireBall from "../skill/ShootFireBall/ShootFireBall";
import Collisionable from "../skill/interfaces";

class Player extends GameObject implements Collisionable {
  config: PlayerConfig
  image?: HTMLImageElement

  position: TypePosition
  moveTarget: TypePosition = null;

  skills: Skill[] = [];
  HP: number;

  private isAlive: Boolean = true;

  constructor(root: Game, position: TypePosition, config: PlayerConfig) {
    super(root);

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
    /// test
    this.skills.push(new ShootFireBall({
      key: "q",
      parent: this
    }))

    this.addEventListener();
  }

  update() {
    this.checkAndMove();
    this.render();
    this.checkIsDied();
  }

  onDestroy() {
    this.isAlive = false;
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

  //MARK: Private Methods

  private render() {
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

  private addEventListener() {
    if (!this.config.isOperated) return ;
    // mousedown
    this.root.$canvas.addEventListener("mousedown", e => {
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
    });

    /// keyup
    window.addEventListener("keyup", e => {
      this.skills.forEach(skill => {
        if (!this.isAlive) return ;
        if (skill.checkIfUse(e.key)) {
          skill.use(this.root.cursorPosition);
        }
      });
    });
  }

  private checkAndMove() {
    if (!this.moveTarget) return ;
    const {speed} = this.config;
    const distance = C.distance(this.position, this.moveTarget);
    const angle = C.angle(this.position, this.moveTarget);
    const moveDistance = Math.min(
      speed * this.deltaTime,
      distance
    );
    if (moveDistance === distance) this.moveTarget = null;
    this.position!.x += moveDistance * Math.cos(angle);
    this.position!.y += moveDistance * Math.sin(angle);
  }

  private checkIsDied() {
    if (this.HP <= 0) this.destroy();
  }
}


export default Player;
