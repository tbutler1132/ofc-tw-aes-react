import "./App.css"
import Nav from "./components/Nav"
import Halos from "./features/halos/Halos"
import Halo from "./features/halos/Halo"

function App() {
  return (
    <div className="App">
      <Nav />
      <div id="home" className="home">
        <Halos />
      </div>
    </div>
  )
}

export default App
