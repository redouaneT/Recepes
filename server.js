const express = require("express");
const app = express();
const fs = require("fs");
const request = require("request");
const path = require("path");
const { PORT } = require("./config");
const fetch = require("./fetch");

app.use("/static", express.static(path.join(__dirname, "client", "static")));

app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "index.html"));
});

app.listen(PORT || 4041, () => {
	console.log(`Server is running on port ${PORT}.`);
	fetch.getData();
});
