import * as React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"

export default ({data}) => {
  return (
    <main>
      <title>404 - page not found</title>
      <img src={data.logo.src} alt="origami.network logo" />
      <h1>Page not found</h1>
      <p>
        Sorry, the page is not know.
        Go to our <Link to="/">home page</Link>.
      </p>
    </main>
  )
}

export const query = graphql`
  query {
    logo: file(relativePath: { eq: "logo.svg" }) {
      src: publicURL
    }
  }
`;
