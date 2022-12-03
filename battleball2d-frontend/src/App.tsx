import './App.css'
import {Link} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="text-center text-7xl">
        <p> Battle Ball 2D </p>
        <p className="text-5xl mt-4 text-blue-500"> ---Remaster version </p>
      </div>
      <div className="w-full text-center mt-5">
        <Link to="/account">
          <button className="m-auto text-3xl p-4 bg-amber-600 rounded-2xl mt-2 text-gray-100 transition hover:bg-amber-700 active:bg-amber-800">START</button>
        </Link>
      </div>
    </div>
  )
}

export default App
