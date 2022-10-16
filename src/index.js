import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import "./App.css"
import Shop from "./features/shop/Shop"
import Nav from "./components/Nav"
import Halos from "./features/halos/Halos"
import Halo from "./features/halos/Halo"
import Cart from "./features/cart/Cart"
import reportWebVitals from "./reportWebVitals"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { store } from "./app/store"
import { Provider } from "react-redux"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Nav />,
    children: [
      {
        path: "/halos",
        element: <Halos />,
      },
      {
        path: "/halos/:id",
        element: <Halo />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
