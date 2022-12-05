import Game from "../../../base/Game";
import GameObject from "../../../base/GameObject";
import {TypePosition} from "../../../types";
import G from "../../../utils/G";
import Updater from "../../../updater/Updater";
import DirectMoveUpdater from "../../../updater/move/DirectMoveUpdater";
import Player from "../../../player/Player";

export type BallConfig = {
  color?: string
  radius: number
  speed: number
  angle: number
  parent: Player
  maxLength: number
  damage?: number
};

class Ball extends GameObject {
  config: BallConfig;
  position: TypePosition;
  updaters: Updater[] = [];

  constructor(root: Game, position: TypePosition, config: BallConfig) {
    super(root);

    this.config = config;
    this.position = {...position} as TypePosition;
  }

  onStart() {
    this.updaters.push(new DirectMoveUpdater(this, {
      angle: this.config.angle, speed: this.config.speed
    }));
  }

  update() {
    super.update();
    this.render()
  }

  //MARK: Private Methods

  private render() {
    const scale = this.root.scale;
    const {x, y} = this.position!;
    const {radius, color} = this.config;

    G.Circle({
      x: x * scale,
      y: y * scale,
      radius: radius * scale,
      color: color || "#fff"
    });
  }
}


export default Ball;