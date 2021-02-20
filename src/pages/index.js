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
        It has also <Link to="/404">404 status page</Link>.
      </p>

      <h2>Third success</h2>
      <p>The page has logo and quote.</p>
      <img src={data.logo.src} alt="origami.network logo" />
      <blockquote>
        origami.network - the art of software folding
      </blockquote>

      <h2>Fourth success</h2>
      <p>
        There {data.blog.pageInfo.totalCount === 1 ? "is" : "are"} {data.blog.pageInfo.totalCount} blog post{data.blog.pageInfo.totalCount === 1 ? "" : "s"}.
        See the latest.
      </p>
      <ol>
        {data.blog.posts.map(post => (
          <li key={post.id}>
            <Link to={post.fields.page.path}>
              <header>
                {new Date(post.revision.date).toDateString()}
                <h3>{post.document.title}</h3>
                {post.pageAttributes.category}
              </header>
            </Link>
          </li>
        ))}
      </ol>
      <p>
        See all <Link to="/blog">blog posts</Link>.
      </p>
    </main>
  )
}

export const query = graphql`
  query {
    logo: file(relativePath: { eq: "logo.svg" }) {
      src: publicURL
    }
    blog: allAsciidoc(filter: {pageAttributes: {type: {eq: "blog"}}}, sort: {order: DESC, fields: revision___date}, limit: 5) {
      posts: nodes {
        id
        document {
          title
        }
        revision {
          date
        }
        fields {
          page {
            path
          }
        }
        pageAttributes {
          category
        }
      }
      pageInfo {
        totalCount
      }
    }
  }`
