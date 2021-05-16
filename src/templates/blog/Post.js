import React from "react";
import { graphql } from "gatsby"
import { Link } from "gatsby"

export default function Post({data}) {
  return (
    <>
      <nav>
        <ul>
          <li><Link to="/"><img src={data.logo.src} alt="origami.network logo" width="100px" /></Link></li>
          <li><Link to="/blog/posts">blog posts</Link></li>
        </ul>
      </nav>
      <main>
        <header>
          {new Date(data.post.revision.date).toDateString()}
          <h1>{data.post.document.title}</h1>
          {data.post.pageAttributes.category}
        </header>
        <div dangerouslySetInnerHTML={{ __html: data.post.html }} />
        <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode">
          <img src="https://licensebuttons.net/l/by-nc-nd/4.0/88x31.png" alt="Attribution-NonCommercial-NoDerivatives 4.0 International" />
        </a>
      </main>
    </>
  );
};

export const query = graphql`
  query($id: String!) {
    logo: file(relativePath: { eq: "logo.svg" }) {
      src: publicURL
    }
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
