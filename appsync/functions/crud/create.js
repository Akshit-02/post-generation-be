import { util } from "@aws-appsync/utils";

export function request(ctx) {
  const { input } = ctx.args;
  const now = util.time.nowISO8601();

  const id = input.id || util.autoId();

  const { id: _, ...attributeValues } = input;

  if (!attributeValues.createdAt) {
    attributeValues.createdAt = now;
  }
  if (!attributeValues.updatedAt) {
    attributeValues.updatedAt = now;
  }

  return {
    operation: "PutItem",
    key: util.dynamodb.toMapValues({ id }),
    attributeValues: util.dynamodb.toMapValues(attributeValues),
  };
}

export function response(ctx) {
  return ctx.result;
}
