import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient();
const db = DynamoDBDocumentClient.from(client);

const { USERS_TABLE } = process.env;

export const handler = async (event) => {
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

      await db.send(
        new PutCommand({ TableName: USERS_TABLE, Item: userPayload })
      );
    }

    return event;
  } catch (error) {
    console.error("Error in post-confirmation:", error);
    return event;
  }
};
