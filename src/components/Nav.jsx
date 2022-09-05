import { HashLink } from "react-router-hash-link"

function Nav() {
  return (
    <div className="nav">
      <div className="nav-links">
        <HashLink className="nav-link" to="/#home">
          Home
        </HashLink>
        <HashLink className="nav-link" to="/#shop">
          Shop
        </HashLink>
      </div>
    </div>
  )
}

export default Nav
