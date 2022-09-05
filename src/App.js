import "./App.css"
import Nav from "./components/Nav"
import StemPlayer from "./features/stemPlayer/StemPlayer"
import Shop from "./features/shop/Shop"

function App() {
  return (
    <div className="App">
      <Nav />
      <div id="home" className="home">
        <StemPlayer />
        <Shop />
      </div>
    </div>
  )
}

export default App
