import Updater from "../Updater";
import {TypePosition} from "../../types";
import GameObject from "../../base/GameObject";
import config from "tailwindcss/defaultConfig";

class DirectMoveUpdater extends Updater {
  maxLength: number;

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
      const moveDistance = receptor.deltaTime * config.speed;
      const position = receptor.position;
      position!.x += moveDistance * Math.cos(config.angle);
      position!.y += moveDistance * Math.sin(config.angle);
      this.maxLength -= moveDistance;
    });
    this.maxLength = config.maxLength || NaN;
  }
}

export default DirectMoveUpdater;