import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {decrement, increment} from "../../redux/counterSlice";

function Counter() {
  const count = useState<number>(0);

  return (
    <div>
      <h1>{count[0]}</h1>
      <button onClick={() => count[1](count[0] + 1)}>Click +1.</button>
    </div>
  );
}

export default Counter;