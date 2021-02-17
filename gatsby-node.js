// https://www.gatsbyjs.com/docs/tutorial/part-seven/

const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === "Asciidoc") {
    console.log(node)
    console.log(getNode(node.parent))
    console.log(createFilePath({ node, getNode, basePath: `pages` }));

    actions.createNodeField({
      node,
      name: "metadata",
      value: {
        path: "type/date/slug",
        slug: "slug",
        date: new Date()
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
              metadata {
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
      path: node.fields.metadata.path,
      component,
      context: {
        id: node.id
      }
    })  
  });
};
