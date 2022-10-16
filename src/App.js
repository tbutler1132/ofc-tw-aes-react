import Nav from "./components/Nav"
import Halos from "./features/halos/Halos"

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
