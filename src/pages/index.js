import * as React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"

export default ({ data }) => {
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

      <h2>Third success</h2>
      <p>The page has logo and quote.</p>
      <img src={data.logo.src} alt="origami.network logo" />
      <blockquote>
        origami.network - the art of software folding
      </blockquote>
    </main>
  )
}

export const query = graphql`
  query {
    logo: file(relativePath: { eq: "logo.svg" }) {
      src: publicURL
    }
  }`
