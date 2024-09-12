import './tracing_typescript';
import opentelemetry from '@opentelemetry/api';
import { S3 } from 'aws-sdk';
import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
const tracer = opentelemetry.trace.getTracer("example");
const s3 = new S3({
    s3ForcePathStyle: true,
    credentials: {
        accessKeyId: "S3RVER", // This specific key is required when working offline
        secretAccessKey: "S3RVER",
    },
    endpoint: "http://localhost:4569",
}); //This is to use with serverless-offline plugin, no aws required ;) 

export const handler: APIGatewayProxyHandler = async (event): Promise<APIGatewayProxyResult> => {
    return tracer.startActiveSpan("getObjectTS", async (span) => {
        const bucketName = 'local-bucket';
        const objectKey = '1234';

        try {
            const params: S3.GetObjectRequest = {
                Bucket: bucketName!,
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
                statusCode: (error as AWSError).statusCode || 500,
                body: JSON.stringify({ message: 'Error retrieving object from S3', error: (error as Error).message }),
            };
        } finally {
            span.end();
        }
    });
};

interface AWSError extends Error {
    statusCode?: number;
}