require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-sass",
    // "gatsby-plugin-offline",
    "gatsby-plugin-remove-serviceworker",
  ],
};