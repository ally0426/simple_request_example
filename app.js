var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	morgan = require("morgan"),
	request = require("request"),
	requestUrl = "https://fs-student-roster.herokuapp.com/students";

require("locus");
app.set("view engine", "jade");
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan("dev"));


app.get("/", function(req,res){
  res.render("index");
});

app.post('/students', function(req,res){
	// request code here
	
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
