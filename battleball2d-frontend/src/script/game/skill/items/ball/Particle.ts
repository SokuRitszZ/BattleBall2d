import GameObject from "../../../base/GameObject";
import Game from "../../../base/Game";
import {TypePosition} from "../../../types";
import G from "../../../utils/G";
import ZoomUpdater from "../../../updater/effect/ZoomUpdater";
import DirectMoveUpdater from "../../../updater/move/DirectMoveUpdater";
import FadeUpdater from "../../../updater/effect/FadeUpdater";

export type ParticleConfig = {
  maxLen: number
  maxTime: number
  maxRadius: number
  radius: number
  angle: number
  color: string
};

class Particle extends GameObject{
  startTime: Date;
  position: TypePosition;
  config: ParticleConfig;

  constructor(root: Game, position: TypePosition, config: ParticleConfig) {
    super(root);

    this.startTime = new Date();
    this.config = config;
    this.position = ({...position} as TypePosition);
  }

  onStart() {
    // 尺寸
    this.updaters.push(new ZoomUpdater(this, this.config.maxTime, (radius: number) => {
      return Math.max(0, radius - this.config.maxRadius / this.config.maxTime * this.deltaTime);
    }));

    // 移动
    this.updaters.push(new DirectMoveUpdater(this, {
      angle: this.config.angle,
      speed: this.config.maxLen / this.config.maxTime,
      maxLength: this.config.maxLen,
      disappearIfEnd: true
    }));

    // this.updaters.push(new FadeUpdater(this, this.config.maxTime, color => {
    //   if (/^#[0-9a-zA-Z]+$/.test(color)) {
    //     color = color.slice(1);
    //     color = `rgba(${parseInt(color.slice(0, 2), 16)}, ${parseInt(color.slice(2, 4), 16)}, ${parseInt(color.slice(4, 6), 16)}, 1.0)`;
    //   }
    //   let ope = parseFloat(color.match(/[0-9]+\.[0-9]+/)![0]);
    //   ope -= 2 * this.deltaTime;
    //   ope = Math.max(ope, 0);
    //   return color.replace(/[0-9]+\.[0-9]+/, ope.toString());
    // }));
  }

  update() {
    super.update();
    this.render();
    if (Date.now() - +this.startTime >= this.config.maxTime * 1000)
      this.destroy();
  }

  render() {
    const scale = this.root.scale;
    G.Circle({
      radius: this.config.radius * scale,
      x: this.position!.x * scale,
      y: this.position!.y * scale,
      color: this.config.color
    });
  }
}

export default Particle;