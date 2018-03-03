const AWS = require('aws-sdk');
const bodyParser= require('body-parser');
const express= require('express');
const multer= require('multer');
const multerS3= require('multer-s3');
const app= express();

var s3Bucket = new AWS.S3({
  "accessKeyId":"AKIAIG6MU4PBHJNUSRBQ",
  "secretAccessKey":"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",
  "region":"us-east-2"
});

app.use(bodyParser.json());

var upload = multer({
  storage:multerS3({
    s3:s3Bucket,
    bucket:'testbyjus' + '/' + 'testupload',
    key:(req, file, cb)=> {
      console.log(file);
      cb(null, file.originalname);
    }
  })
});

app.get('/',(req,res)=>{
  res.sendFile(__dirname + '/index.html');
});

app.post('/upload', upload.array('file1',1),(req, res, next)=>{
  res.send("Uploaded!");
});

app.listen(8000,()=>{
console.log('server started at port 3008');
});