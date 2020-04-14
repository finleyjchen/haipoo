exports.onCreateNode = ({ node }) => {
    console.log(node.internal.type)
  }

  exports.onCreatePage = ({ page, actions }) => {
    const { createPage } = actions
    // Make the front page match everything client side.
    // Normally your paths should be a bit more judicious.
    if (page.path.match(/^\/poem/)) {
      // page.matchPath is a special key that's used for matching pages
      // with corresponding routes only on the client.
      page.matchPath = "/poem/*"
      // Update the page.
      createPage(page)
    }
    if (page.path.match(/^\/poet/)) {
      // page.matchPath is a special key that's used for matching pages
      // with corresponding routes only on the client.
      page.matchPath = "/poet/*"
      // Update the page.
      createPage(page)
    }
  }