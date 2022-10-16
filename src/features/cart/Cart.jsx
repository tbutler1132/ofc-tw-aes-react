import {
  useGetCartQuery,
  useRemoveFromCartMutation,
} from "../../app/services/Shopify"
import Button from "@mui/material/Button"
import { Link } from "react-router-dom"
function Cart() {
  const existingCart = localStorage.getItem("checkoutId")
  const { data: cartData, isLoading: cartIsLoading } = useGetCartQuery(
    existingCart.slice(19)
  )
  const [removeFromCart, cartResults] = useRemoveFromCartMutation()
  const removeFromCartHandler = (cartLineId) => {
    removeFromCart({
      cartId: cartData.cart.id.slice(19),
      cartLineId: cartLineId.slice(23),
    })
  }
  if (cartIsLoading) return <div>Loading...</div>
  return (
    <div className="cart">
      {cartData.cart.lines.edges.length > 0 ? (
        <Button variant="contained" id="clear-cart-button">
          Clear Cart
        </Button>
      ) : null}
      <h1>Your Cart</h1>
      {cartData.cart.lines.edges.length > 0 ? (
        <>
          <table>
            <tbody>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
              {cartData?.cart.lines.edges.map((item) => (
                <tr key={item.node.id}>
                  <td>{item.node.merchandise.product.title}</td>
                  <td>{item.node.merchandise.priceV2.amount}</td>
                  <td>{item.node.quantity}</td>
                  <td>
                    ${item.node.merchandise.priceV2.amount * item.node.quantity}
                  </td>
                  <td>
                    <Button
                      onClick={() => removeFromCartHandler(item.node.id)}
                      style={{ cursor: "pointer" }}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>Total: ${cartData.cart.cost.subtotalAmount.amount}</h3>
          <a id="checkout-link" href={cartData.cart.checkoutUrl}>
            <Button id="checkout-button" variant="outlined" color="primary">
              Checkout
            </Button>
          </a>
          <span id="with-shopify">
            <small>with Shopify</small>
          </span>
          <div className="back-to-shop-button">
            <Link to="/#shop">
              <Button color="inherit">Back to shop</Button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <strong>Cart is empty</strong>
          <div className="back-to-shop-button">
            <Link to="/halos">
              <Button color="inherit">Back to home</Button>
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart
