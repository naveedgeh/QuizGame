const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const path = require("path");
const { readdir } = require("fs");

const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);
app.use(cors());

app.use("/static", express.static(path.join(__dirname, "/uploads/")));

if (process.env.NODE_ENV == "development") {
  app.use(logger("tiny"));
}

readdir("./Routes", (err, files) =>
  files.map((r) => app.use("/api", require(`./Routes/${r}`)))
);
const Port = process.env.PORT || 8080;
app.listen(Port, () => {
  console.log(`http://localhost${Port}`);
  require("./Database/database");
});
