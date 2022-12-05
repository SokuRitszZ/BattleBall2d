import Player from "./Player";
import Game from "../base/Game";
import {PlayerConfig, TypePosition} from "../types";
import {Simulate} from "react-dom/test-utils";
import play = Simulate.play;
import player from "./Player";
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
    const player = C.selectRandom(this.root.players);
    if (player === this) return ;
    const skill = C.selectRandom(this.skills);
    skill.use(player.position);
  }
};

export default AIPlayer;