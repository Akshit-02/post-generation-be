# Post Generation Backend Service

A serverless backend service for generating and managing social media posts, built with AWS AppSync, AWS Lambda, and DynamoDB.

## Features

- **AI-Powered Post Generation**: Generate creative post ideas using AI
- **Structured Post Management**: Store and manage post metadata including hooks, stories, and visual content
- **Media Handling**: Integration with S3 for storing and serving media assets
- **GraphQL API**: Type-safe API with AWS AppSync
- **Serverless Architecture**: Built on AWS serverless technologies for scalability and cost-efficiency

## Tech Stack

- **API**: AWS AppSync (GraphQL)
- **Compute**: AWS Lambda
- **Database**: Amazon DynamoDB
- **Storage**: Amazon S3 (for media assets)
- **Authentication**: Amazon Cognito User Pools
- **Infrastructure as Code**: AWS SAM (Serverless Application Model)

## Getting Started

### Prerequisites

- AWS Account with appropriate permissions
- AWS CLI configured with credentials
- Node.js 14.x or later
- AWS SAM CLI

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Akshit-02/post-generation-be.git
   cd post-generation-be
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Deployment

1. Build the application:

   ```bash
   sam build
   ```

2. Deploy the application:

   ```bash
   sam deploy --guided
   ```

   Follow the interactive prompts to configure the deployment.
