import Buff from "./Buff";
import Player from "../player/Player";

class BeatenBackBuff extends Buff {
  constructor(player: Player, angle: number, distance: number, duration: number) {
    let lastTimestamp = 0;
    let speed = distance * 2 / duration;
    let timer: number;
    const a = speed / duration;
    super(() => {
      const engine = (timestamp: number) => {
        if (!lastTimestamp) {
          lastTimestamp = timestamp;
        } else {
          const deltaTime = (timestamp - lastTimestamp) / 1000;
          lastTimestamp = timestamp;
          const mov = speed * deltaTime;
          player.position!.x += mov * Math.cos(angle);
          player.position!.y += mov * Math.sin(angle);
          speed = Math.max(0, speed - a * deltaTime);
        }
        requestAnimationFrame(engine);
      };
      timer = requestAnimationFrame(engine);
      setTimeout(() => {
        this.cancel();
      }, duration * 1000);
    }, () => {
      cancelAnimationFrame(timer);
    });
  }
}

export default BeatenBackBuff;