var express = require('express');
var app = express();
const fileUpload = require('express-fileupload');
var request = require("request").defaults({ encoding: null });
var fs = require("fs");
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

// fs.writeFile("./image.png", body, function(err) {
//     if (err) throw err;
// });

app.use(fileUpload());
var bodyParser = require('body-parser');
var cors=require('cors');

var url = "mongodb://localhost:27017/";
var MongoClient = require('mongodb').MongoClient;
app.use(cors({'origin':true,'credentials': true}));
app.set('view engine', 'pug');
app.set('views','./nodeTuts/views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
// app.use(upload.array());
// app.use(cookieParser());
// app.use(session({secret: "Your secret key"}));

app.use(express.static('./'));
app.set('view engine', 'pug');
app.set('views','./nodeTuts/views');
MongoClient.connect(url, { useNewUrlParser: true },function(err, db)                                                                                    //connected mongodb
{
    if (err) throw err;
    let dbo = db.db("gkeep");
    let Users = [];
    let ele;
    let thumb=[];
    app.get('/read', function(req,res) {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        
            dbo.collection("image").find({}).toArray(function(err, result)                                                  //finds values from databases
            {
                if (err) {throw err;}
                result.forEach(element => {
                    console.log(element);
                    thumb.push(element);
                   
                });
                // console.log(res.json(thumb));
                res.json(thumb);
            })
    });
    app.post('/upload', function(req,res) {
        console.log("@@@@@@@@@@@@@@@@@");
        console.log(req.files);
        dbo.collection("image").insert(req.files,function(err, resu)                                                  //finds values from databases
            {
                if (err) {throw err;}
                console.log("Insert: ",resu);
                res.send(resu);
            })

            console.log(thumb);
    });
    
    // app.post('/upload', upload.single('example'), (req, res, next) => {
    //     // req.file is the `example` file or whatever you have on the `name` attribute: <input type="file" name="example" />
    //     // I believe it is a `Buffer` object.

    //     console.log(req.files);
    //     // const encoded = req.files.toString('base64');
    //     // // console.log(encoded);
    //     // res.json(encoded);
    //   })

});

app.listen(7896);
