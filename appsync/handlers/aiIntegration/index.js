import { analyzeCommentsBatchHandler } from "./resolvers/analyzeCommentsBatch.js";
import Logger from "/opt/nodejs/logger.js";

export const handler = async (event) => {
  Logger.info(`🚀 EVENT: ${JSON.stringify(event)}`);
  const { fieldName } = event;

  try {
    switch (fieldName) {
      case "analyzeCommentsBatch":
        return analyzeCommentsBatchHandler(event);
      default:
        throw new Error(`Unsupported operation: ${fieldName}`);
    }
  } catch (error) {
    Logger.error("Error in aiIntegration lambda:", error);
  }
};
