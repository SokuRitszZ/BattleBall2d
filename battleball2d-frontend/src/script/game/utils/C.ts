import {CircleConfig, TypePosition} from "../types";

class C {
  static isHex(s: string) {
    return s.length === 6 && !isNaN(Number("0x" + s));
  }

  static distance(pos1: TypePosition, pos2: TypePosition) {
    const dx = pos1!.x - pos2!.x;
    const dy = pos1!.y - pos2!.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  static angle(from: TypePosition, to: TypePosition) {
    const dx = to!.x - from!.x;
    const dy = to!.y - from!.y;
    return Math.atan2(dy, dx);
  }

  static isCollision(p: CircleConfig, q: CircleConfig) {
    return p.config.radius + q.config.radius > C.distance(p.position, q.position);
  }
}

export default C;
