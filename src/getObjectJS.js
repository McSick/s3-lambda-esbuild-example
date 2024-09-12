const tracing = require('./tracing');
const opentelemetry = require('@opentelemetry/api');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    s3ForcePathStyle: true,
    credentials: {
        accessKeyId: "S3RVER", // This specific key is required when working offline
        secretAccessKey: "S3RVER",
    },
    endpoint: "http://localhost:4569",
}); //This is to use with serverless-offline plugin, no aws required ;) 

const tracer = opentelemetry.trace.getTracer('example');
module.exports.handler = async (event) => {
    return tracer.startActiveSpan('getObjectJS', async (span) => {
        const bucketName = 'local-bucket';
        const objectKey = '1234';

        try {
            const params = {
                Bucket: bucketName,
                Key: objectKey,
            };

            const data = await s3.getObject(params).promise();

            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Object retrieved successfully',
                    content: data.Body?.toString('utf-8'),
                }),
            };
        } catch (error) {
            console.error('Error:', error);
            return {
                statusCode: error.statusCode || 500,
                body: JSON.stringify({ message: 'Error retrieving object from S3', error: error.message }),
            };
        } finally {
            span.end();
        }
    });
};