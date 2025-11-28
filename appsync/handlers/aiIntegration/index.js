import { generateIdeasForPostHandler } from "./resolvers/generateIdeasForPost.js";
import { generatePostsHandler } from "./resolvers/generatePosts.js";
import Logger from "/opt/nodejs/logger.js";

export const handler = async (event) => {
  Logger.info(`🚀 EVENT: ${JSON.stringify(event)}`);
  const { fieldName } = event;

  try {
    switch (fieldName) {
      case "generateIdeasForPost":
        return await generateIdeasForPostHandler(event);
      case "generatePosts":
        return await generatePostsHandler(event);
      default:
        throw new Error(`Unsupported operation: ${fieldName}`);
    }
  } catch (error) {
    Logger.error("Error in aiIntegration lambda:", error);
  }
};
