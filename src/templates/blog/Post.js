import React from "react";
import { graphql } from "gatsby"
import { Link } from "gatsby"

export default function Post({data}) {
  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">home page</Link></li>
          <li><Link to="/blog">blog</Link></li>
        </ul>
      </nav>
      <main>
        <header>
          {new Date(data.post.revision.date).toDateString()}
          <h1>{data.post.document.title}</h1>
          {data.post.pageAttributes.category}
        </header>
        <div dangerouslySetInnerHTML={{ __html: data.post.html }} />
      </main>
    </>
  );
};

export const query = graphql`
  query($id: String!) {
    post: asciidoc(id: {eq: $id}) {
      html
      document {
        title
      }
      revision {
        date
      }
      pageAttributes {
        category
      }
    }
  } 
`;
