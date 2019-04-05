const Express = require("express");
const BodyParser = require("body-parser");
const mongo = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
//DBCursor dbCursor = dbName.find();
const dbName = "INDE402TEMP";
const colName="Temperature Readings";
//int length = dbCursor.count();
//const url = `mongodb://localhost:27017`;
const url = "mongodb+srv://admin:Password123@cluster0-mhtdk.mongodb.net/test?retryWrites=true";//Change this to your own

var app = Express();
var port = process.env.PORT || 3000;

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(Express.static('www'));

MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
    if (error) throw error;
    database = client.db(dbName);
    collection = database.collection(colName);
    console.log(`Connected to ${dbName}`);
})

app.get("/", (req, res) => {
    res.send('empty page');
});

app.post("/addData", (req, res) => {
    res.status(200);
    database.collection(colName).insertOne(req.body, (err, result) => {
        if (err) throw err;
        console.log("Saved");
        res.redirect("/");

    })
})

app.get("/getData", (req, res) => {
    res.status(200);
    database.collection("Temperature Readings").find().toArray((err, result) => {
        if (err) throw err;
        res.send(result);
        /*if (skip >0){
          dbCursor.skip(skip);
          length = 10;
        }
        while (dbCursor.hasNext()){
          DBObject dbObject = dbCursor.next();
        }*/
    })

})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
