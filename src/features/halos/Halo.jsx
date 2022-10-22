import { useState } from "react"
import { useParams } from "react-router-dom"
import {
  useGetProductQuery,
  useUpdateCartMutation,
  useGetCartQuery,
} from "../../app/services/Shopify"
import { Link } from "react-router-dom"
import Button from "@mui/material/Button"
import Snackbar from "@mui/material/Snackbar"
import LinearProgress from "@mui/material/LinearProgress"
import ReactPlayer from "react-player"

const productPresentInCart = (product, cart) => {
  const id = product.product.variants.edges[0].node.id
  const cartIds = cart.lines.edges.map((el) => (el = el.node.merchandise.id))
  return cartIds.includes(id)
}

function Halo() {
  let { id } = useParams()
  const existingCart = localStorage.getItem("checkoutId")
  const { data, isLoading } = useGetProductQuery(id)
  const [updateCart] = useUpdateCartMutation()
  const [buttonDisabled, disableButton] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const { data: cartData, isLoading: cartIsLoading } = useGetCartQuery(
    existingCart.slice(19)
  )

  const addToCartHandler = () => {
    disableButton(true)
    setSnackbarMessage("Adding to your cart")
    setSnackbarOpen(true)
    updateCart({
      cartId: cartData.cart.id.slice(19),
      merchandiseId: data.product.variants.edges[0].node.id.slice(29),
    })
      .unwrap()
      .then((payload) => {
        if (payload.error) {
          setSnackbarMessage(payload.error.data)
          setSnackbarOpen(true)
          disableButton(false)
          return
        } else {
          setSnackbarMessage("Successfully added to your cart")
          setSnackbarOpen(true)
          return
        }
      })
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  const action = (
    <>
      <Button
        size="small"
        aria-label="close"
        color={
          snackbarMessage === "Successfully added to your cart"
            ? "success"
            : "warning"
        }
        variant="contained"
        onClick={handleSnackbarClose}
      >
        Close
      </Button>
    </>
  )

  if (isLoading || cartIsLoading) return <LinearProgress />
  return (
    <div className="item">
      <ReactPlayer
        height="500px"
        width="50%"
        url={data.product.tags[0]}
        controls={true}
      />
      <div className="item-purchase-info">
        <h1>{data.product.title}</h1>
        <h3>${data.product.variants.edges[0].node.priceV2.amount}</h3>
        <p>{data.product.description}</p>
        {productPresentInCart(data, cartData.cart) ? (
          <Link to="/cart">Go to cart</Link>
        ) : (
          <Button
            disabled={buttonDisabled}
            variant="outlined"
            color="primary"
            onClick={addToCartHandler}
          >
            Add to cart
          </Button>
        )}
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={action}
      />
    </div>
  )
}

export default Halo
