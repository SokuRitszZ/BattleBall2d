import GameObject from "../base/GameObject";
import Game from "../base/Game";
import {GameMapConfig} from "../types";
import G from "../utils/G";

class GameMap extends GameObject{
  config: GameMapConfig;

  constructor(root: Game, config: GameMapConfig) {
    super(root);

    this.config = config;
  }

  onStart() {
  }

  update() {
    this.renderBackground();
  }

  private renderBackground() {
    const scale = this.root.scale;

    // 渲染背景
    const {widthRatio, heightRatio} = this.config;
    const width = widthRatio * scale;
    const height = heightRatio * scale;
    G.Rectangle({
      x: 0,
      y: 0,
      lx: width,
      ly: height,
      color: "#888"
    });

    // 渲染点阵
    for (let i = 0; i <= widthRatio; ++i) {
      for (let j = 0; j <= heightRatio; ++j) {
        G.Circle({
          x: i * scale,
          y: j * scale,
          radius: 0.03 * scale
        });
      }
    }
  }
}

export default GameMap;