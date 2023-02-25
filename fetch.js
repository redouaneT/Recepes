const fs = require("fs");
const path = require("path");
const { API_KEY } = require("./config");
async function getData() {
	let url = "https://tasty.p.rapidapi.com/recipes/list?from=0&size=25";
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": "70b07249c3msh4b89e88931be115p17411cjsn6636b5efbf04",
			"X-RapidAPI-Host": "tasty.p.rapidapi.com",
		},
	};
	const response = await fetch(url, options);
	const data = await response.json();
	var newData = JSON.stringify(data.results);
	fs.writeFile(
		path.join(__dirname, "client", "static/js//views/recepe.json"),
		newData,
		"utf8",
		(err) => {
			if (err) throw err;
			console.log("complete");
		}
	);
}
module.exports = {
	getData: getData,
};
