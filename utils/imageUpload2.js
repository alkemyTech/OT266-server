const AWS = require('aws-sdk');

//Import modules
const fs = require('fs')

//Import validator
const {ValidateExtension} = require('./validators/fileExtension/imageExtension')


async function uploadFile(fileName){

    const s3 = new AWS.S3({
        accessKeyId: process.env.S3_PUBLIC_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
    });

    //Path from root
    const fileStream = fs.createReadStream(`./utils/temporaryImages/${fileName}`);

    //First validate the extension file
    let validateExtensionTest = ValidateExtension(fileName)

    if (validateExtensionTest == true) {
        //Params for the upload method
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: fileName,
            Body: fileStream,
            ACL: 'public-read',
        };
        // method
        return s3.upload(params).promise();
    }else{
        return "Extension is not valid"
    }

}

module.exports = {uploadFile}