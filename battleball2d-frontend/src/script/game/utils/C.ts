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

  static selectRandom<T>(list: T[]) {
    const n = list.length;
    const index = Math.floor(n * Math.random());
    return list[index];
  }

  static cross(p: TypePosition, q: TypePosition) {
    if (p && q) return (p.x * q.y - p.y * q.x);
    return 0;
  }

  static angleType(a: number, b: number) {
    const pa: TypePosition = {
      x: Math.cos(a),
      y: Math.sin(a)
    };
    const pb: TypePosition = {
      x: Math.cos(b),
      y: Math.sin(b)
    };
    const lc = this.distance(pa, pb);
    const res = -(lc * lc - 1 - 1) / 2;
    return !!res ? res / Math.abs(res) : 0;
  }

  static angleMod(angle: number) {
    return angle * 1000 % Math.floor(Math.PI * 2 * 1000) / 1000;
  }
}

export default C;
