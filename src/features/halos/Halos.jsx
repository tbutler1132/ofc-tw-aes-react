import React from "react"
import { useGetProductsQuery } from "../../app/services/Shopify"
import { Link } from "react-router-dom"

const cleanUpShopifyId = (originalId) => {
  return originalId.slice(22)
}

function Halos() {
  const { data, isLoading } = useGetProductsQuery()

  if (isLoading) return <div>Loading...</div>
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
  )
}

export default Halos
