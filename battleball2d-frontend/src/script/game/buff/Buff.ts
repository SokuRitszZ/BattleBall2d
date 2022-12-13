import Player from "../player/Player";

type BuffFunc = (params?: any) => void;

class Buff {
  buff: BuffFunc;
  disbuff: BuffFunc;
  player: Player | null = null;

  constructor(buff: BuffFunc, disbuff: BuffFunc) {
    this.buff = buff;
    this.disbuff = disbuff;
  }

  addTo(player: Player, params?: any) {
    this.player = player;
    player.buffs.push(this);
    this.buff(params);
  }

  cancel(params?: any) {
    this.disbuff(params);
    this.player!.buffs = this.player!.buffs.filter(buff => buff !== this);
  }
}

export default Buff;