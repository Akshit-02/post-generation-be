import Logger from "/opt/nodejs/logger.js";

export const generatePostsHandler = async (event) => {
  try {
    Logger.info("Generating posts with event:", event);
    return { success: true, message: "Posts generation triggered" };
  } catch (error) {
    Logger.error("Error in generatePostsHandler:", error);
    return { success: false, message: "Failed to generate posts" };
  }
};
