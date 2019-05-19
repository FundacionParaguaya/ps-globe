const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const geocoding = new require('reverse-geocoding-google');

var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGO_URI;

const pipeline = [
  {$match: {'operationType': 'insert'}}
];


function getColor(){
  let colors = ['red','yellow','green','blue']
  return colors[Math.floor(Math.random() * colors.length)];
}


io.on('connection', function(socket) {
  console.log('a user connected')
})

function generateFamilyObj(document) {
  var config = {
    'latitude': document.latitude,
    'longitude': document.longitude,
    'key': process.env.MAPS_API
  }

  geocoding.location(config, (err, data) => {
    let doc = {
      "id": parseInt(document.tblId),
      "city" : data.results[0].address_components[4].long_name || "none",
      "color" : getColor(),
      "coordinates" : [document.latitude.toString().substring(0,9), document.longitude.toString().substring(0,9)],
      "value":25
    }
    io.emit('msg', doc )
  })
}

MongoClient.connect(url, function(err, db) {
  if (err) throw err;

  db = db.db("povstop_final");
  const collection = db.collection('family');
  const changeStream = collection.watch(pipeline);
  changeStream.on('change', (doc) => {
    let document = doc.fullDocument

    generateFamilyObj(document)
  });
});


http.listen(process.env.PORT, function() {
  console.log('listening on PORT '+ process.env.PORT)
})