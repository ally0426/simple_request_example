var express = require("express"),
	app = express(),
	morgan = require("morgan"),
	bodyParser = require("body-parser"),
	request = require("request"),
	// requestUrl = "http://localhost:5000/students";
	requestUrl = "https://g22-students.herokuapp.com/students";

require("locus");
app.set("view engine", "jade");
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan("dev"));

app.get("/", function(req,res){
  res.render("index");
});

app.post('/students', function(req,res){
	// request code here
	var options = {
		method: "POST",
		uri: requestUrl,
		headers: {
		    'Accept': 'application/json',
		    'content-type': 'application/json'
		},
		form: req.body
	};
	request(options, function(err, response, body){
		console.log(err);
		if (err || response.statusCode >= 400) {
			res.render("failure");
		}
		else {
			res.render("success");
		}
	});
	
});

app.get("/success", function(req, res){
	res.render("success");
});

app.get("*", function(req,res){
  res.render("failure");
});

app.listen(3000, function(){
  console.log("Server is listening on port 3000");
});
