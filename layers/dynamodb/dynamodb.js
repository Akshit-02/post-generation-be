import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  UpdateCommand,
  GetCommand,
  ScanCommand,
  PutCommand,
  DeleteCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";

let dbClient;

export function getDynamoClient() {
  if (!dbClient) {
    const client = new DynamoDBClient();
    dbClient = DynamoDBDocumentClient.from(client);
  }
  return dbClient;
}

export const genericGet = async ({ tableName, key }) => {
  const db = getDynamoClient();
  const command = new GetCommand({ TableName: tableName, Key: key });
  const response = await db.send(command);
  return response.Item;
};

export const genericScan = async ({
  tableName,
  filterExpression = null,
  expressionAttributeValues = {},
  expressionAttributeNames = {},
  exclusiveStartKey = null,
  limit = null,
}) => {
  const db = getDynamoClient();
  const params = {
    TableName: tableName,
    ...(filterExpression && { FilterExpression: filterExpression }),
    ...(Object.keys(expressionAttributeValues).length > 0 && {
      ExpressionAttributeValues: expressionAttributeValues,
    }),
    ...(Object.keys(expressionAttributeNames).length > 0 && {
      ExpressionAttributeNames: expressionAttributeNames,
    }),
    ...(exclusiveStartKey && { ExclusiveStartKey: exclusiveStartKey }),
    ...(limit && { Limit: limit }),
  };
  const response = await db.send(new ScanCommand(params));
  return {
    items: response.Items || [],
    lastEvaluatedKey: response.LastEvaluatedKey || null,
  };
};

export const genericQuery = async ({
  tableName,
  keyConditionExpression,
  expressionAttributeValues,
  indexName = null,
  options = {},
  sortDescending = false,
}) => {
  const db = getDynamoClient();
  const command = new QueryCommand({
    TableName: tableName,
    KeyConditionExpression: keyConditionExpression,
    ExpressionAttributeValues: expressionAttributeValues,
    ...(indexName && { IndexName: indexName }),
    ScanIndexForward: !sortDescending,
    ...options,
  });
  const response = await db.send(command);
  return response.Items || [];
};

export const genericCreate = async ({ tableName, item }) => {
  const db = getDynamoClient();
  await db.send(new PutCommand({ TableName: tableName, Item: item }));
  return item;
};

export const genericUpdate = async ({ tableName, key, updateData }) => {
  const filteredUpdateData = { ...updateData };
  Object.keys(key).forEach((k) => delete filteredUpdateData[k]);

  const updateExpression = [];
  const expressionAttributeValues = {};
  const expressionAttributeNames = {};

  Object.entries(filteredUpdateData).forEach(([k, v]) => {
    if (v !== undefined && v !== null) {
      expressionAttributeNames[`#${k}`] = k;
      expressionAttributeValues[`:${k}`] = v;
      updateExpression.push(`#${k} = :${k}`);
    }
  });

  if (updateExpression.length === 0) {
    throw new Error("No valid attributes to update");
  }

  const pkName = Object.keys(key)[0];
  expressionAttributeNames["#pk"] = pkName;

  const db = getDynamoClient();
  const command = new UpdateCommand({
    TableName: tableName,
    Key: key,
    UpdateExpression: `SET ${updateExpression.join(", ")}`,
    ExpressionAttributeValues: expressionAttributeValues,
    ExpressionAttributeNames: expressionAttributeNames,
    ConditionExpression: "attribute_exists(#pk)",
    ReturnValues: "ALL_NEW",
  });
  const result = await db.send(command);
  return result.Attributes;
};

export const genericDelete = async ({ tableName, key }) => {
  try {
    const db = getDynamoClient();
    await db.send(new DeleteCommand({ TableName: tableName, Key: key }));
    return true;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};

export const genericQueryWithPagination = async ({
  tableName,
  keyConditionExpression,
  expressionAttributeValues,
  indexName = null,
  exclusiveStartKey = null,
  options = {},
}) => {
  const { limit = null, scanIndexForward = true, ...otherOptions } = options;
  const db = getDynamoClient();
  const command = new QueryCommand({
    TableName: tableName,
    KeyConditionExpression: keyConditionExpression,
    ExpressionAttributeValues: expressionAttributeValues,
    ...(indexName && { IndexName: indexName }),
    ...(exclusiveStartKey && { ExclusiveStartKey: exclusiveStartKey }),
    ...(limit && { Limit: limit }),
    ScanIndexForward: scanIndexForward,
    ...otherOptions,
  });
  const response = await db.send(command);
  return {
    items: response.Items || [],
    lastEvaluatedKey: response.LastEvaluatedKey,
  };
};

export const genericScanWithPagination = async ({
  tableName,
  filterExpression = null,
  expressionAttributeValues = {},
  expressionAttributeNames = {},
  exclusiveStartKey = null,
}) => {
  const db = getDynamoClient();
  const command = new ScanCommand({
    TableName: tableName,
    ...(filterExpression && { FilterExpression: filterExpression }),
    ...(Object.keys(expressionAttributeValues).length > 0 && {
      ExpressionAttributeValues: expressionAttributeValues,
    }),
    ...(Object.keys(expressionAttributeNames).length > 0 && {
      ExpressionAttributeNames: expressionAttributeNames,
    }),
    ...(exclusiveStartKey && { ExclusiveStartKey: exclusiveStartKey }),
  });
  const response = await db.send(command);
  return {
    items: response.Items || [],
    lastEvaluatedKey: response.LastEvaluatedKey,
  };
};
