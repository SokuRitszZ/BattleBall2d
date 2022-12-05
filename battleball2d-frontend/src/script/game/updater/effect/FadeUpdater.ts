import Updater from "../Updater";

class FadeUpdater extends Updater {
  startTime: Date;

  constructor(receptor: {config: {color: string}}, time: number, f: (opacity: string) => string) {
    super(() => {
      if (Date.now() - +this.startTime > time * 1000) return ;
      receptor.config.color = f(receptor.config.color);
    });
    this.startTime = new Date();
  }
}

export default FadeUpdater;