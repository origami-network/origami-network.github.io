import * as React from "react"
import { Link } from "gatsby"

export default () => {
  return (
    <main>
      <title>origami.network</title>
      <h1>Hello world!</h1>

      <h2>First success</h2>
      <p>
        The page has build process in place!
      </p>

      <h2>Second success</h2>
      <p>
        The page is generated using <a href="https://www.gatsbyjs.com/">gatsby.js</a>!.
        It has also <Link to="/something-that-do-not-exists">404 status page</Link>.
      </p>
    </main>
  )
}
