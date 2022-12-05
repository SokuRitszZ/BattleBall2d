import Player from "./Player";
import Game from "../base/Game";
import {PlayerConfig, TypePosition} from "../types";
import C from "../utils/C";

class AIPlayer extends Player {
  constructor(root: Game, position: TypePosition, config: PlayerConfig) {
    super(root, position, config);
  }

  update() {
    this.selectMoveTarget();
    this.autoUseSkills();
    super.update();
  }

  //MARK: Private Methods

  private selectMoveTarget() {
    if (!this.moveTarget) {
      const {widthRatio, heightRatio} = this.root.gameMap.config;
      this.moveTarget = {
        x: widthRatio * Math.random(),
        y: heightRatio * Math.random()
      };
    }
  }

  private autoUseSkills() {
    const get = Math.floor(Math.random() * 100);
    if (get > 3) return ;
    const player = C.selectRandom(this.root.players);
    if (player === this) return ;
    const skill = C.selectRandom(this.skills);
    skill.use(player.position);
  }
};

export default AIPlayer;