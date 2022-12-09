import GameObject from "../../../base/GameObject";
import Game from "../../../base/Game";
import {TypePosition} from "../../../types";
import FadeUpdater from "../../../updater/effect/FadeUpdater";
import G from "../../../utils/G";

type ShadowConfig = {
  color: string
  radius: number
}

class Shadow extends GameObject {
  position: TypePosition;
  config: ShadowConfig;
  maxTime: number;

  constructor(root: Game, position: TypePosition, config: ShadowConfig) {
    super(root);

    this.position = {...position!};
    this.config = config;
    this.maxTime = 0.1;
  }

  onStart() {
    setTimeout(() => {
      this.destroy();
    }, this.maxTime * 1000);
    const vFade = 1 / this.maxTime;
    this.updaters.push(new FadeUpdater(this, this.maxTime, color => {
      if (/^#[0-9a-zA-Z]+$/.test(color)) {
        color = color.slice(1);
        color = `rgba(${parseInt(color.slice(0, 2), 16)}, ${parseInt(color.slice(2, 4), 16)}, ${parseInt(color.slice(4, 6), 16)}, 1.0)`;
      }
      let ope = parseFloat(color.match(/[0-9]+\.[0-9]+/)![0]);
      ope -= vFade * this.deltaTime;
      return color.replace(/[0-9]+\.[0-9]+/, ope.toString());
    }));
  }

  update() {
    super.update();
    this.render();
  }

  render() {
    const scale = this.root.scale;
    G.Circle({
      color: this.config.color,
      radius: this.config.radius * scale,
      x: this.position!.x * scale,
      y: this.position!.y * scale
    });
  }
}

export default Shadow;