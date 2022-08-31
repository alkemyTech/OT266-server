const AWS = require('aws-sdk');
const fetch = require("cross-fetch"); 

async function uploadFile(fileurl, namefile, extension){
    let validextensions = [ '.pdf', '.jpg','.jpeg', '.png',];
    const res = await fetch.fetch(fileurl)
    const blob = await res.buffer()
    const s3 = new AWS.S3({
        accessKeyId: process.env.S3_PUBLIC_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
    });
    if (validextensions.indexOf(extension.toLowerCase()) > 0) {
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: namefile + extension,
            Body: blob,
            ACL: 'public-read',
        };
          var result = s3.upload(params).promise();
          result.then(function(data) {
              console.log(data)
              return data;
          })
          .catch(function(err) {
              return err;
          });
      
    }else{
        return "Extension Not Valid"
    }
}

module.exports = {uploadFile}