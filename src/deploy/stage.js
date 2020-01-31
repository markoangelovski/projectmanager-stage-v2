const fs = require("fs");
const path = require("path");
const ghpages = require("gh-pages");

// Rename React's "Build" folder to "Docs" for GHPages
fs.renameSync(
  path.join(__dirname, "../../", "/build"),
  path.join(__dirname, "../../", "/docs")
);

ghpages.publish();
