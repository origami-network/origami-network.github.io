// https://www.gatsbyjs.com/docs/tutorial/part-seven/

const path = require('path');
const slug = require('slug');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === "Asciidoc") {
    actions.createNodeField({
      node,
      name: "page",
      value: {
          path: path.join(
            node.pageAttributes.type,
            node.revision.date,
            slug(node.document.title)
          )
        }
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const component = path.resolve(`./src/templates/blog/Post.js`);
  const result = await graphql(`
    query {
      allAsciidoc {
        edges {
          node {
            id
            fields {
              page {
                path
              }
            }
          }
        }
      }
    }
  `);

  result.data.allAsciidoc.edges.forEach(({node}) => {
    actions.createPage({
      path: node.fields.page.path,
      component,
      context: {
        id: node.id
      }
    })  
  });
};
