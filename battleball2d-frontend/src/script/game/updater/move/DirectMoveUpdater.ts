import Updater from "../Updater";
import {TypePosition} from "../../types";
import GameObject from "../../base/GameObject";

class DirectMoveUpdater extends Updater {
  angle: number;
  speed: number;
  maxLength: number;
  disappearIfEnd: boolean;

  constructor(receptor: GameObject & {position: TypePosition}, config: {
    angle: number,
    speed: number,
    maxLength?: number,
    disappearIfEnd?: boolean
  }) {
    super(() => {
      if (!isNaN(this.maxLength) && this.maxLength <= 0) {
        if (config.disappearIfEnd) receptor.destroy();
        return ;
      }
      const moveDistance = receptor.deltaTime * this.speed;
      const position = receptor.position;
      position!.x += moveDistance * Math.cos(this.angle);
      position!.y += moveDistance * Math.sin(this.angle);
      this.maxLength -= moveDistance;
    });
    this.angle = config.angle;
    this.speed = config.speed;
    this.maxLength = config.maxLength || NaN;
    this.disappearIfEnd = config.disappearIfEnd || false;
  }

  setConfig(key: "speed" | "angle", value: any) {
    this[key] = value;
  }
}

export default DirectMoveUpdater;