import {  useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import { increment, decrement } from '@/redux/features/counter/counterSlice';

function App() {
 const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}

export default App;