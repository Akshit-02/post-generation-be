import { genericCreate } from "/opt/nodejs/dynamodb.js";
import Logger from "/opt/nodejs/logger.js";

const { USERS_TABLE } = process.env;

export const handler = async (event) => {
  Logger.info("🚀 Event Post-confirmation:", JSON.stringify(event, null, 2));

  try {
    const { userName, request, triggerSource } = event;
    const { sub, email, phone_number } = request.userAttributes;
    const userId = `${userName}::${sub}`;

    if (triggerSource === "PostConfirmation_ConfirmSignUp") {
      const now = new Date().toISOString();

      const userPayload = {
        id: userId,
        email: email,
        phoneNo: phone_number,
        createdAt: now,
        updatedAt: now,
      };

      await genericCreate(USERS_TABLE, userPayload);
    }

    return event;
  } catch (error) {
    Logger.error("Error in post-confirmation:", error);
    return event;
  }
};
