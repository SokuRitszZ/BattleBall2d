import GameObject from "../../../base/GameObject";
import Game from "../../../base/Game";
import {ParticleConfig, TypePosition} from "../../../types";
import G from "../../../utils/G";

class Particle extends GameObject{
  position: TypePosition;
  config: ParticleConfig;

  radius: number;
  vLen: number;
  vRadius: number;

  constructor(root: Game, position: TypePosition, config: ParticleConfig) {
    super(root);

    this.config = config;
    this.position = ({...position} as TypePosition);

    this.radius = this.config.maxRadius;
    this.vLen = this.config.maxLen / this.config.maxTime;
    this.vRadius = this.config.maxRadius / this.config.maxTime;
  }

  update() {
    this.render();
    // 尺寸
    this.radius -= this.vRadius * this.deltaTime;
    this.radius = Math.max(this.radius, 0);

    // 距离
    const moveDistance = this.vLen * this.deltaTime;
    this.position!.x += moveDistance * Math.cos(this.config.angle);
    this.position!.y += moveDistance * Math.sin(this.config.angle);
  }

  render() {
    const scale = this.root.scale;
    G.Circle({
      radius: this.radius * scale,
      x: this.position!.x * scale,
      y: this.position!.y * scale,
      color: this.config.color
    });
  }
}

export default Particle;