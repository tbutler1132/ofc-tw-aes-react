import React from "react"
import { useGetCollectionQuery } from "../../app/services/Shopify"
import { Link } from "react-router-dom"
import LinearProgress from "@mui/material/LinearProgress"
import { isolateId } from "../../utils/utils"

function Halos() {
  const { data, isLoading } = useGetCollectionQuery(
    process.env.REACT_APP_STEMS_COLLECTION
  )

  if (isLoading) return <LinearProgress />
  return (
    <div id="home" className="home">
      {data.map((haloObj) => (
        <HaloPreview key={haloObj.node.id} halo={haloObj} />
      ))}
    </div>
  )
}

function HaloPreview({ halo }) {
  return (
    <div id="home" className="home">
      <Link to={`/halos/${isolateId(22, halo.node.id)}`}>
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

export default Halos
