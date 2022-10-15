import React from "react"
import { useParams } from "react-router-dom"
import {
  useGetProductQuery,
  useUpdateCartMutation,
  useGetCartQuery,
  useRemoveFromCartMutation,
} from "../../app/services/Shopify"

const productPresentInCart = (product, cart) => {
  console.log(product, cart)
  const id = product.product.variants.edges[0].node.id
  const cartIds = cart.lines.edges.map((el) => (el = el.node.merchandise.id))
  return cartIds.includes(id)
}

const getCartLineId = (product, cart) => {
  return cart.lines.edges.find(
    (el) => el.node.id === product.product.variants.edges[0].node.id
  )
}

function Halo() {
  let { id } = useParams()
  const existingCart = localStorage.getItem("checkoutId")
  const { data, isLoading } = useGetProductQuery(id)
  const [updateCart, results] = useUpdateCartMutation()
  const [removeFromCart, cartResults] = useRemoveFromCartMutation()
  const { data: cartData, isLoading: cartIsLoading } = useGetCartQuery(
    existingCart.slice(19)
  )

  const addToCartHandler = () => {
    updateCart({
      cartId: cartData.cart.id.slice(19),
      merchandiseId: data.product.variants.edges[0].node.id.slice(29),
    })
  }

  const removeFromCartHandler = () => {
    removeFromCart({
      cartId: cartData.cart.id.slice(19),
      cartLineId: getCartLineId(data, cartData),
    })
  }

  if (isLoading || cartIsLoading) return <div>Loading...</div>
  return (
    <div>
      {data.product.title}
      {productPresentInCart(data, cartData.cart) ? (
        <button onClick={removeFromCartHandler}>Remove from cart</button>
      ) : (
        <button onClick={removeFromCartHandler}>Add to cart</button>
      )}
    </div>
  )
}

export default Halo
