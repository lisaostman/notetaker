var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();
var PORT = 5000;

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
  fs.readFile(__dirname + '/db/db.json', "utf8", function (err, data) {
    if (err) throw err;
    var data2 = JSON.parse(data);
    res.json(data2);
  });
});





app.post("/api/notes", function(req, res) {
  
  var notes = req.body;
  
  fs.readFile(__dirname + '/db/db.json', function (err, data) {
    var json = JSON.parse(data);

    if (json.length === 0) {
      notes.id = 1;
    }
    else {
      let lastId = json[json.length - 1].id;
      let thisId = lastId + 1;

      notes.id = thisId;
    }

    console.log(notes);
    
    json.push(notes)

    fs.writeFile(__dirname + '/db/db.json', JSON.stringify(json), function(err){
      if (err) throw err;
      console.log('The "data to append" was appended to file!');
    });

    res.json(json);

    
})
  
});

app.delete("/api/notes/:id", function(req, res) {
  var chosen = req.params.id;
  var parseChosen = parseInt(chosen);
  var index = -1;

  fs.readFile(__dirname + '/db/db.json', function (err, data) {
 
    var data2 = JSON.parse(data);
    
    for (i=0; i < data2.length; i++) {
      if (data2[i].id === parseChosen) {
        index = i;
        break
      }
    }

    array = data2.splice(index, 1);

    fs.writeFile(__dirname + '/db/db.json', JSON.stringify(data2), function(err){
      if (err) throw err;
      console.log('The "data to append" was removed from file!');
    });
    console.log(data2);
    res.json(data2);

   
  })



});



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
