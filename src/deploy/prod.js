const fs = require("fs");
const path = require("path");
const ghpages = require("gh-pages");

const { CNAME } = require("../config/prod.json");
const robots = fs.readFileSync(
  path.join(
    __dirname,
    "../",
    `/config/${process.env.REACT_APP_API_CONFIG}.txt`
  ),
  "utf8"
);

const build = path.join(__dirname, "../../", "/build");
const prod = path.join(__dirname, "../../", "/prod");

// Rename React's "build" folder to "prod" for GHPages
if (fs.existsSync(build) && !fs.existsSync(prod)) {
  fs.renameSync(build, prod);
}

// Create CNAME file
fs.writeFileSync(path.join(__dirname, "../../", "prod", "CNAME"), CNAME);

// Create robots.txt file
fs.writeFileSync(path.join(prod, "robots.txt"), robots);

// Deploy /prod to gh-pages
ghpages.publish(
  prod,
  {
    remote: "origin-production",
    user: {
      name: "Angelovski",
      email: "marko.angelovski@gmail.com"
    }
  },
  err => {
    if (err) throw err;
    console.log(
      "Deploy to https://markoangelovski.github.io/projectmanager-prod-v2 completed."
    );
    fs.rmdirSync(prod, { recursive: true });
  }
);
