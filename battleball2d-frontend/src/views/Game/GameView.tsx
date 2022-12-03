import React, {useRef} from 'react';

import style from "./GameView.module.scss";
import Game from "../../script/game/base/Game";

function GameView() {
  const $parent = useRef<HTMLDivElement>(null);
  const $canvas = useRef<HTMLCanvasElement>(null);

  Promise.resolve()
    .then(() => {
      if ($canvas.current && $parent.current) {
        const game = new Game($parent.current, $canvas.current);
        game.start();
      }
    });

  return (
    <div ref={$parent} className={style.frame}>
      <canvas ref={$canvas} className={style.canvas}/>
    </div>
  );
}

export default GameView;