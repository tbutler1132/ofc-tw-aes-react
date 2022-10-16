import { useGetCollectionQuery } from "../../app/services/Shopify"
import { Link } from "react-router-dom"
import LinearProgress from "@mui/material/LinearProgress"

const cleanUpShopifyId = (originalId) => {
  return originalId.slice(22)
}

function Shop() {
  const { data, isLoading } = useGetCollectionQuery("283714781393")

  if (isLoading) return <LinearProgress />
  return (
    <div id="home" className="home">
      {data.map((el) => (
        <HaloPreview key={el.node.id} halo={el} />
      ))}
    </div>
  )
}

function HaloPreview({ halo }) {
  return (
    <div id="home" className="home">
      <Link to={`/halos/${cleanUpShopifyId(halo.node.id)}`}>
        <img
          alt="halo"
          height="250"
          width="250"
          src={halo.node.featuredImage.url}
        />
        <h1>{halo.node.title}</h1>
        <p>{halo.node.description}</p>
      </Link>
    </div>
  )
}

export default Shop
