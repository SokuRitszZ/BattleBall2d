import React from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {decrement, increment} from "../../redux/counterSlice";

function Counter() {
  const count = useAppSelector(state => state.counterReducer.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}

export default Counter;