var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.json());


app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname + "/public/notes.html"));
});

app.get("/api/notes", function(req, res) {
  fs.readFile(__dirname + '/db/db.json', function (err, data) {
    if (err) throw err;
    console.log(data);
  });
});

app.post("/api/notes", function(req, res) {
  fs.appendFile(__dirname + '/db/db.json', req, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
