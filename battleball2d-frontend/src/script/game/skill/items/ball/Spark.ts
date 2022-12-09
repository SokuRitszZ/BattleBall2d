import GameObject from "../../../base/GameObject";
import Game from "../../../base/Game";
import {TypePosition} from "../../../types";
import ZoomUpdater from "../../../updater/effect/ZoomUpdater";
import FadeUpdater from "../../../updater/effect/FadeUpdater";
import G from "../../../utils/G";

type SparkConfig = {
  radius: number
  color: string
  time: number
};

class Spark extends GameObject {
  startTime: Date;
  position: TypePosition;
  config: SparkConfig;

  constructor(root: Game, position: TypePosition, config: SparkConfig) {
    super(root);

    this.startTime = new Date();
    this.position = {...position!};
    this.config = config;
  }

  onStart() {
    // Zoom
    const R = this.config.radius;
    let T = this.config.time;
    const k = R / Math.pow(T, 0.75);
    this.updaters.push(new ZoomUpdater(this, this.config.time, radius => {
      radius = k * Math.pow(Math.max(0, T), 0.75);
      T -= this.deltaTime;
      return radius;
    }));
    // Fade
    this.updaters.push(new FadeUpdater(this, this.config.time, color => {
      if (/^#[0-9a-zA-Z]+$/.test(color)) {
        color = color.slice(1);
        color = `rgba(${parseInt(color.slice(0, 2), 16)}, ${parseInt(color.slice(2, 4), 16)}, ${parseInt(color.slice(4, 6), 16)}, 1.0)`;
      }
      let ope = parseFloat(color.match(/[0-9]+\.[0-9]+/)![0]);
      ope -= 2 * this.deltaTime;
      return color.replace(/[0-9]+\.[0-9]+/, ope.toString());
    }));
  }

  update() {
    super.update();
    this.render();
    if (Date.now() - +this.startTime >= this.config.time * 1000) this.destroy();
    if (!this.config.radius) this.destroy();
  }

  //MARK: Private Methods

  private render() {
    const scale = this.root.scale;
    G.Circle({
      color: this.config.color,
      radius: this.config.radius * scale,
      x: this.position!.x * scale,
      y: this.position!.y * scale
    });
  }
}

export default Spark;