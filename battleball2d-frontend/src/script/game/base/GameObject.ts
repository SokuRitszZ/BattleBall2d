import Game from "./Game";
import Updater from "../updater/Updater";

export const tagMultiGameAct = "tagMultiGameAct";

class GameObject {
  nanoid: string = "";
  root: Game;
  hasCreated: Boolean;
  hasStarted: Boolean;
  hasDestroyed: Boolean;

  updaters: Updater[] = [];

  private trulyDeltaTime: number = 0;

  get deltaTime() {
    return this.trulyDeltaTime / 1000
  }
  set deltaTime(val: number) {
    this.trulyDeltaTime = val;
  }

  constructor(root: Game) {
    this.root = root;
    this.hasStarted = false;
    this.hasDestroyed = false;
    this.hasCreated = false;

    this.create();
  }

  create() {
    if (this.hasStarted)
      throw new Error("This Game Object has been created.");

    this.onCreate();

    this.root.addObject(this);
    this.hasCreated = true;

    this.afterCreate();
  }

  start() {
    this.onStart();

    this.hasStarted = true;

    this.afterStart();
  }

  destroy() {
    if (this.hasDestroyed)
      throw new Error("This Game Object has been destroyed.");

    this.onDestroy();

    this.root.removeObject(this);
    this.hasDestroyed = true;

    this.afterDestroy();
  }

  // 生命周期: onCreate, afterCreate, onStart, afterStart update, onDestroy, afterDestroy
  onCreate(): void {

  }

  afterCreate(): void {

  }

  onStart(): void {

  }

  afterStart(): void {

  }

  update(): void {
    this.updaters.forEach(updater => updater.callback());
  }

  onDestroy(): void {

  }

  afterDestroy(): void {

  }
};

export default GameObject;
