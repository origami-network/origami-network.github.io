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
          {data.asciidoc.fields.metadata.date}
          <h1>{data.asciidoc.document.title}</h1>
          {data.asciidoc.pageAttributes.category}
        </header>
        <div dangerouslySetInnerHTML={{ __html: data.asciidoc.html }} />
      </main>
    </>
  );
};

export const query = graphql`
  query($id: String!) {
    asciidoc(id: {eq: $id}) {
      html
      document {
        title
      }
      fields {
        metadata {
          date(formatString: "DD MMMM, YYYY")
        }
      }
      pageAttributes {
        category
      }
    }
  } 
`;
