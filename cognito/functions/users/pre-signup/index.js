import Logger from "/opt/nodejs/logger.js";

export const handler = async (event) => {
  Logger.info("🚀 Event Pre-Signup:", JSON.stringify(event, null, 2));

  if (event.request.userAttributes.email) {
    event.response.autoConfirmUser = true;
    event.response.autoVerifyEmail = true;
  }

  return event;
};
