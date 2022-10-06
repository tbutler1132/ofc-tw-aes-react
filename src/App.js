import "./App.css"
import Nav from "./components/Nav"
import StemPlayer from "./features/stemPlayer/StemPlayer"
// import Shop from "./features/shop/Shop"
import LandingPage from "./features/landingPage/LandingPage"
import Halos from "./features/halos/Halos"
import { useGetClientQuery } from "./app/services/Shopify"

function App() {
  const { data } = useGetClientQuery()
  console.log("t", data)
  return (
    <div className="App">
      <Nav />
      <div id="home" className="home">
        <Halos />
        <LandingPage />
        <StemPlayer />
      </div>
    </div>
  )
}

export default App
