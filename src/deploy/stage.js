const fs = require("fs");
const path = require("path");
const ghpages = require("gh-pages");

const build = path.join(__dirname, "../../", "/build");
const stage = path.join(__dirname, "../../", "/stage");

// Rename React's "build" folder to "stage" for GHPages
if (fs.existsSync(build) && !fs.existsSync(stage)) {
  fs.renameSync(build, stage);
}

// Deploy /stage to gh-pages
ghpages.publish(
  stage,
  {
    remote: "origin-staging",
    user: {
      name: "Angelovski",
      email: "marko.angelovski@gmail.com"
    }
  },
  err => {
    if (err) throw err;
    console.log(
      "Deploy to https://markoangelovski.github.io/projectmanager-stage-v2 completed."
    );
  }
);

// fs.rmdirSync(stage, { recursive: true });
