const fs = require("fs");
const path = require("path");
const ghpages = require("gh-pages");

const robots = fs.readFileSync(
  path.join(__dirname, "../", `/config/stage.txt`),
  "utf8"
);

const build = path.join(__dirname, "../../", "/build");
const stage = path.join(__dirname, "../../", "/stage");

// Rename React's "build" folder to "stage" for GHPages
if (fs.existsSync(build) && !fs.existsSync(stage)) {
  fs.renameSync(build, stage);
}

// Create robots.txt file
fs.writeFileSync(path.join(stage, "robots.txt"), robots);

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
    fs.rmdirSync(stage, { recursive: true });
  }
);
