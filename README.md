# S3 Lambda esbuild Example

This project demonstrates a serverless application using AWS Lambda functions to interact with S3, built with the Serverless Framework and esbuild. It includes both JavaScript and TypeScript examples, along with local development support using serverless-offline and serverless-s3-local.

## Features

- AWS Lambda functions for S3 operations (GET, PUT, LIST)
- Support for both JavaScript and TypeScript
- Local development environment with serverless-offline and serverless-s3-local
- OpenTelemetry integration for tracing
- Honeycomb.io integration for observability

## Prerequisites

- Node.js (version 20.x recommended)
- AWS CLI configured with appropriate credentials
- Serverless Framework CLI

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/McSick/s3-lambda-esbuild-example
   cd s3-lambda-esbuild-example
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your Honeycomb API key as an environment variable:
   ```
   export HONEYCOMB_API_KEY=your-api-key-here
   ```

## Local Development

To run the project locally:

```
npm run debug
```

This command starts the serverless-offline environment with debugging enabled.

## Project Structure

- `src/`: Contains the Lambda function handlers
  - `getObjectJS.js`: JavaScript version of the GET object function
  - `getObjectTS.ts`: TypeScript version of the GET object function
  - `listObjects.js`: Function to list objects in the S3 bucket
  - `putObject.js`: Function to put objects into the S3 bucket
- `serverless.yml`: Serverless Framework configuration
- `package.json`: Project dependencies and scripts
- `s3-local/`: Directory for local S3 bucket simulation

## Configuration

The `serverless.yml` file contains the main configuration for the project:

- AWS provider settings
- Function definitions
- S3 bucket resource
- Plugin configurations (serverless-offline, serverless-s3-local)
- esbuild settings for bundling and optimization

## Functions

1. `webhook`: Handles GET requests to the root path
2. `getObjectJS`: Retrieves an object from S3 (JavaScript version)
3. `getObjectTS`: Retrieves an object from S3 (TypeScript version)
4. `listObjects`: Lists objects in the S3 bucket

## Endpoints

When running the application locally using `serverless offline`, the following endpoints are available:

### HTTP Endpoints

These endpoints simulate API Gateway requests:

1. Root endpoint:
   ```
   GET http://localhost:4000/dev
   ```

2. Get Object (JavaScript version):
   ```
   GET http://localhost:4000/dev/get-object-js
   ```

3. Get Object (TypeScript version):
   ```
   GET http://localhost:4000/dev/get-object-ts
   ```

4. List Objects:
   ```
   GET http://localhost:4000/dev/list-objects
   ```

### Lambda Invocation Endpoints

These endpoints allow direct invocation of Lambda functions:

1. Webhook function:
   ```
   POST http://localhost:4000/2015-03-31/functions/webhook/invocations
   ```

2. Get Object function (JavaScript):
   ```
   POST http://localhost:4000/2015-03-31/functions/getObjectJS/invocations
   ```

3. Get Object function (TypeScript):
   ```
   POST http://localhost:4000/2015-03-31/functions/getObjectTS/invocations
   ```

4. List Objects function:
   ```
   POST http://localhost:4000/2015-03-31/functions/listObjects/invocations
   ```

To test these endpoints, you can use tools like cURL, Postman, or any HTTP client. For the POST requests to Lambda invocation endpoints, you'll need to provide a JSON payload that mimics the event object that AWS Lambda would receive.

Example using cURL for a GET request:
```bash
curl http://localhost:4000/dev/get-object-js
```

Example using cURL for a POST request to invoke a Lambda function:
```bash
curl -X POST http://localhost:4000/2015-03-31/functions/getObjectJS/invocations -d '{}'
```

Remember to replace the empty JSON payload `'{}'` with actual test data as needed for your functions.

## Local S3 Bucket

The project uses `serverless-s3-local` to simulate an S3 bucket locally. The bucket is named `local-bucket` and is configured in the `serverless.yml` file.

## Observability

The project is set up with OpenTelemetry for tracing and integrates with Honeycomb.io for observability. Make sure to set your Honeycomb API key in the environment variables.

## Building and Deployment

The project uses esbuild for bundling and optimization. The build configuration is defined in the `serverless.yml` file under the `build` section.

To deploy to AWS:

```
serverless deploy
```


## Notes

- The project is configured to use `nodejs20.x` runtime.
- AWS SDK is excluded from bundling and will be provided by the Lambda execution environment.
- Source maps are enabled for better debugging experience.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the ISC License - see the [LICENSE.md](LICENSE.md) file for details.