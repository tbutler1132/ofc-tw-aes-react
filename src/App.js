import "./App.css"
import Nav from "./components/Nav"
import StemPlayer from "./features/stemPlayer/StemPlayer"
import Shop from "./features/shop/Shop"
import LandingPage from "./features/landingPage/LandingPage"
import HalosContainer from "./features/halos/HalosContainer"

function App() {
  return (
    <div className="App">
      <Nav />
      <div id="home" className="home">
        <HalosContainer />
        <LandingPage />
        <StemPlayer />
        <Shop />
      </div>
    </div>
  )
}

export default App
