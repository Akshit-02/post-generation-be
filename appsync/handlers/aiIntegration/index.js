import { generateIdeasForPostHandler } from "./resolvers/generateIdeasForPost.js";
import { generatePostsHandler } from "./resolvers/generatePosts.js";

export const handler = async (event) => {
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
    console.error("Error in aiIntegration lambda:", error);
  }
};
