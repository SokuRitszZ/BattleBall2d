import Game from "../../../base/Game";
import GameObject from "../../../base/GameObject";
import {BallConfig, TypePosition} from "../../../types";
import G from "../../../utils/G";

class Ball extends GameObject {
  config: BallConfig;
  position: TypePosition;

  constructor(root: Game, position: TypePosition, config: BallConfig) {
    super(root);

    this.config = config;
    this.position = {...position} as TypePosition;
  }

  update() {
    this.move();
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

  private move() {
    const {speed, angle} = this.config;
    const moveDistance = speed * this.deltaTime;
    this.position!.x += moveDistance * Math.cos(angle);
    this.position!.y += moveDistance * Math.sin(angle);
  }
}


export default Ball;