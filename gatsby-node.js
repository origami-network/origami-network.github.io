// https://www.gatsbyjs.com/docs/tutorial/part-seven/

const path = require('path');
const slug = require('slug');

exports.onCreateNode = ({ node, actions }) => {
  if (node.internal.type === "Asciidoc") {
    actions.createNodeField({
      node,
      name: "page",
      value: {
          path: "/" + path.join(
            node.pageAttributes.type,
            node.revision.date,
            slug(node.document.title)
          )
        }
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const post = path.resolve(`./src/templates/blog/Post.js`);
  const result = await graphql(`
    query {
      allAsciidoc(
        sort: {fields: revision___date},
        filter: {pageAttributes: {type: {eq: "blog"}}}
      ) {
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
        totalCount
      }
    }
  `);

  result.data.allAsciidoc.edges.forEach(({node}) => {
    actions.createPage({
      path: node.fields.page.path,
      component: post,
      context: {
        id: node.id
      }
    })
  });

  const posts = path.resolve(`./src/templates/blog/Posts.js`);
  const size = 10;
  const total = Math.ceil(result.data.allAsciidoc.totalCount / size);
  Array.apply(null, new Array(total)).forEach((_, index) => {
    actions.createPage({
      path: index > 0 
        ? path.join("blog", "posts", (index + 1).toString())
        : path.join("blog", "posts"),
      component: posts,
      context: {
        skip: index * size,
        limit: size,
      }
    })
  })
};
