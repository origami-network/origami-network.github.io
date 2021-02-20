import React from "react";
import { graphql } from "gatsby"
import { Link } from "gatsby"

export default function Post({data}) {
  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">home page</Link></li>
        </ul>
      </nav>

      <h1>Blog Posts</h1>

      <ol start={(data.blog.pageInfo.currentPage - 1) * data.blog.pageInfo.perPage + 1}>
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

      <nav>
        <ul>
          {data.blog.pageInfo.hasPreviousPage
            ? (<li><Link to={data.blog.pageInfo.currentPage === 2 ? "/blog/posts" : `/blog/posts/${data.blog.pageInfo.currentPage - 1}`}>{"<<"}</Link></li>)
            : ""
          }
          <li>page {data.blog.pageInfo.currentPage} of {data.blog.pageInfo.pageCount}</li>
          {data.blog.pageInfo.hasNextPage
            ? (<li><Link to={`/blog/posts/${data.blog.pageInfo.currentPage + 1}`}>{">>"}</Link></li>)
            : ""
          }
        </ul>
      </nav>  
    </>
  );
};

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    blog: allAsciidoc(
      filter: {pageAttributes: {type: {eq: "blog"}}},
      sort: {order: DESC, fields: revision___date},
      skip: $skip, limit: $limit, 
    ) {
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
        currentPage
        perPage
        pageCount
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;
