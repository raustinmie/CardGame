const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const path = require("path");

const app = express();

app.use(cors());
app.use(helmet());
app.use("/", express.static(path.join(__dirname, ".")));

app.listen(process.env.PORT || 8080, () => {
	console.log("server running");
});
