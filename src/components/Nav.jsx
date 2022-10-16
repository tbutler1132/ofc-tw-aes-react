import { HashLink } from "react-router-hash-link"
import { Outlet, Link } from "react-router-dom"
import { useCreateCartMutation, useGetCartQuery } from "../app/services/Shopify"
import { useEffect } from "react"
import Badge from "@mui/material/Badge"
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout"

function Nav() {
  const existingCart = localStorage.getItem("checkoutId")
  const [createCart, result] = useCreateCartMutation()
  const { data, isLoading } = useGetCartQuery(existingCart?.slice(19), {
    skip: !existingCart,
  })
  useEffect(() => {
    if (!existingCart) {
      createCart()
        .unwrap()
        .then((result) =>
          localStorage.setItem("checkoutId", result.cartCreate.cart.id)
        )
        .catch((er) => console.log(er))
    }
  }, [createCart, existingCart])
  return (
    <div className="app">
      <div className="nav">
        <div className="nav-links">
          <Link className="nav-link" to="/halos">
            Home
          </Link>
          <Link className="nav-link" to="/shop">
            Shop
          </Link>
        </div>
        <div className="cart-icon">
          <Badge badgeContent={data?.cart.lines.edges.length} color="primary">
            {isLoading || result.isLoading ? null : (
              <Link to="/cart">
                <ShoppingCartCheckoutIcon></ShoppingCartCheckoutIcon>
              </Link>
            )}
          </Badge>
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default Nav
