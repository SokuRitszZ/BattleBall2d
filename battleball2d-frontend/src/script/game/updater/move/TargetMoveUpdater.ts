import Updater from "../Updater";
import {TypePosition} from "../../types";
import C from "../../utils/C";
import GameObject from "../../base/GameObject";

class TargetMoveUpdater extends Updater {
  constructor(receptor: {moveTarget: TypePosition, position: TypePosition} & GameObject, speed: number) {
    super(() => {
      if (!receptor.moveTarget) return ;
      const distance = C.distance(receptor.position, receptor.moveTarget);
      const angle = C.angle(receptor.position, receptor.moveTarget);
      const moveDistance = Math.min(
        speed * receptor.deltaTime,
        distance
      );
      if (moveDistance === distance) receptor.moveTarget = null;
      receptor.position!.x += moveDistance * Math.cos(angle);
      receptor.position!.y += moveDistance * Math.sin(angle);
    });
  }
}

export default TargetMoveUpdater;