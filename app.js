//Recode by YogiPw
const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');

LimitSize = 50 * 1024 * 1024 //50mb

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: {
    fileSize: LimitSize
  }
}).single('recfile');
const upload2 = multer({
  storage: storage,
  limits: {
    fileSize: LimitSize
  }
}).array('recfiles', 5);


// Init app
const app = express();

// EJS
app.set('view engine', 'ejs');

// Public Folder
app.use(express.static('./public'));

app.get('/', (req, res) => res.render('index'));

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.render('index', {
        msg: err
      });
    } else {
      if (req.file == undefined) {
        res.render('index', {
          msg: 'Error: No File Selected!'
        });
      } else {
        res.json({
          msg: 'File Uploaded!',
          file: 'https://' + req.hostname + '/uploads/' + req.file.filename
        });
      }
    }
  });
});
app.post('/upload2', (req, res) => {
  upload2(req,
    res,
    (err) => {
      Hehe = []
      if (err) {
        res.render('index', {
          msg2: err
        });
      } else {
        if (req.files == undefined) {
          res.render('index', {
            msg2: 'Error: No File Selected!'
          });
        } else {
          let x = req.files
          x.forEach(async v => {
            Hehe.push({
              originalname: v.originalname,
              encoding: v.encoding,
              mimetype: v.mimetype,
              size: v.size,
              url: "https://" + req.hostname + "/uploads/" + "v.filename"
            })
            
          }
res.json({
              msg: 'File Uploaded!',
              file: Hehe
            })
          }) 
        });
    });

  const port = process.env.PORT;

  app.listen(port,
    () => console.log(`Server started on port ${port}`));
