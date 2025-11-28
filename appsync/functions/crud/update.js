import { util } from "@aws-appsync/utils";

export function request(ctx) {
  const { input } = ctx.args;
  const now = util.time.nowISO8601();

  const { id, ...updates } = input;

  const updateExpression = [];
  const expressionNames = {};
  const expressionValues = {};

  Object.entries(updates).forEach(([key, value]) => {
    if (value !== undefined) {
      updateExpression.push(`#${key} = :${key}`);
      expressionNames[`#${key}`] = key;
      expressionValues[`:${key}`] = value;
    }
  });

  if (!updates.updatedAt) {
    updateExpression.push("#updatedAt = :updatedAt");
    expressionNames["#updatedAt"] = "updatedAt";
    expressionValues[":updatedAt"] = now;
  }

  return {
    operation: "UpdateItem",
    key: util.dynamodb.toMapValues({ id }),
    update: {
      expression: `SET ${updateExpression.join(", ")}`,
      expressionNames,
      expressionValues: util.dynamodb.toMapValues(expressionValues),
    },
  };
}

export function response(ctx) {
  return ctx.result;
}
