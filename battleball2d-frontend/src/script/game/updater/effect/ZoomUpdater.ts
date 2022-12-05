import Updater from "../Updater";

class ZoomUpdater extends Updater {
  startTime: Date;

  constructor(receptor: {config: {radius: number}}, time: number, f: (radius: number) => number) {
    super(() => {
      if (Date.now() - +this.startTime > time * 1000) return ;
      receptor.config.radius = f(receptor.config.radius);
    });
    this.startTime = new Date();
  }
};

export default ZoomUpdater;