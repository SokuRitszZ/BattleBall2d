import GameObject from "./GameObject";
import GameMap from "../map/GameMap";
import G from "../utils/G";
import {GameMapConfig, TypePosition} from "../types";
import Player from "../player/Player";

class Game {
  $parent: HTMLDivElement;
  $canvas: HTMLCanvasElement;
  gameObjects: GameObject[];
  screenConfig: GameMapConfig;
  gameMap: GameMap;
  scale: number = 0;

  hasStarted: Boolean;

  lastTimeStep: number = 0;
  cursorPosition: TypePosition = null;

  constructor($parent: HTMLDivElement, $canvas: HTMLCanvasElement) {
    this.$parent = $parent;

    this.$canvas = $canvas;
    G.context = $canvas.getContext("2d")!;

    this.gameObjects = [];

    this.screenConfig = {
      widthRatio: 16,
      heightRatio: 9
    };
    this.gameMap = new GameMap(this, {
      widthRatio: 16,
      heightRatio: 9
    });
    this.resize();
    this.resetScale();
    this.initEventListener();

    this.hasStarted = false;

    new Player(this, {
      x: this.screenConfig.widthRatio / 2,
      y: this.screenConfig.heightRatio / 2
    }, {
      maxHP: 100,
      headIcon: "https://cdn.acwing.com/media/user/profile/photo/69613_lg_73ca0939b2.jpg",
      radius: 0.5,
      speed: 1,
      isOperated: true
    });

    new Player(this, {
      x: this.screenConfig.widthRatio / 2,
      y: this.screenConfig.heightRatio / 2
    }, {
      maxHP: 100,
      headIcon: "3f7790",
      radius: 0.5,
      speed: 1,
      isOperated: false
    });
  }

  addObject(gameObject: GameObject) {
    this.gameObjects.push(gameObject);
  }

  removeObject(removedGameObject: GameObject) {
    this.gameObjects = this.gameObjects.filter(gameObject => gameObject !== removedGameObject);
  }

  start() {
    if (this.hasStarted)
      throw new Error("This Game has been started.");
    this.hasStarted = true;

    const engine = (lastTimeStep: number) => {
      this.gameObjects.forEach(gameObject => {
        if (gameObject.hasStarted) {
          gameObject.deltaTime = lastTimeStep - this.lastTimeStep;
          gameObject.update();
        } else {
          gameObject.hasStarted ? gameObject.update() : gameObject.start()
        }
      });
      this.lastTimeStep = lastTimeStep;
      requestAnimationFrame(engine);
    };
    requestAnimationFrame(engine);
  }

  // @MARK: Private Methods

  private initEventListener() {
    this.addEventListener();
    this.preventContextMenu();
  }

  private addEventListener() {
    // resize
    window.addEventListener("resize", () => {
      Promise.resolve().then(() => {
        this.resetScale();
        this.resize();
      });
    });

    // mousemove
    this.$canvas.addEventListener("mousemove", e => {
      this.cursorPosition = {
        x: e.offsetX / this.scale,
        y: e.offsetY / this.scale
      }
    });
  }

  private preventContextMenu() {
    this.$canvas.addEventListener("contextmenu", e => e.preventDefault());
  }

  private resize() {
    const rect = this.$parent;
    const width = window.innerWidth * 11 / 12;
    const height = window.innerHeight * 5 / 6;
    const {widthRatio, heightRatio} = this.screenConfig;
    const scale = Math.min(width / widthRatio, height / heightRatio);
    rect.style.width = `${scale * widthRatio}px`;
    rect.style.height = `${scale * heightRatio}px`;
  }

  private resetScale() {
    const c = G.context;
    const rect = this.$parent;
    c.canvas.width = rect.clientWidth;
    c.canvas.height = rect.clientHeight;
    const {width, height} = c.canvas;

    const scale = Math.min(
      width / this.screenConfig.widthRatio,
      height / this.screenConfig.heightRatio
    );
    this.scale = scale;
  }
}

export default Game;