const AWS = require('aws-sdk');

const client = new AWS.S3({
    accessKeyId: process.env.S3_PUBLIC_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY
});

const s3 = {
    client: client,
    bucket_name: process.env.S3_BUCKET_NAME
};

// uploading file to s3
exports.upload = (req, res) => {
    if (!req.file) {
        res.status(400).json({ error: 'Please select a file to upload' });
    }

    // setting up s3 upload parameters
    const params = {
        Bucket: s3.bucket_name,
        Key: req.file.originalname.replace(/\s+/g, "-"),
        Body: req.file.buffer,
        ACL: 'public-read',
    };

    console.log('Starting file upload op');
    s3.client.upload(params, (err, data) => {
        if (err) {
            // console.log(err);
            res.status(500).json({ error: 'Error while uploading file' });
        } else {
            console.log(data);
            res.json({
                data
            });
        }
    });
};
