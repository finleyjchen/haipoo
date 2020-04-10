require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-sass",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Haipoo`,
        short_name: `Haipoo`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: `src/images/favicon.svg`,
      },
    },
    "gatsby-plugin-offline",
    // "gatsby-plugin-remove-serviceworker",
  ],
};