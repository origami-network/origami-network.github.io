import * as React from "react"
import { Link } from "gatsby"

export default () => {
  return (
    <main>
      <title>404 - page not found</title>
      <h1>Page not found</h1>
      <p>
        Sorry, the page is not know.
        Go to our <Link to="/">home page</Link>.
      </p>
    </main>
  )
}
