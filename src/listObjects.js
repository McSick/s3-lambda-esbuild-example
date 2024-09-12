const AWS = require('aws-sdk');
   const s3 = new AWS.S3({
     s3ForcePathStyle: true,
     credentials: {
       accessKeyId: "S3RVER",
       secretAccessKey: "S3RVER",
     },
     endpoint: "http://localhost:4569",
   });

   module.exports.handler = async (event) => {
     const bucketName = process.env.BUCKET_NAME || 'local-bucket';

     try {
       const params = {
         Bucket: bucketName,
       };

       const data = await s3.listObjects(params).promise();
      
       return {
         statusCode: 200,
         body: JSON.stringify({
           message: 'Objects listed successfully',
           objects: data.Contents,
         }),
       };
     } catch (error) {
       console.error('Error:', error);
       return {
         statusCode: error.statusCode || 500,
         body: JSON.stringify({ message: 'Error listing objects in S3', error: error.message }),
       };
     }
   };