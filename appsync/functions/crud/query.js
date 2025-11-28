import { util } from "@aws-appsync/utils";
import * as ddb from "@aws-appsync/utils/dynamodb";

export function request(ctx) {
  const {
    keyName = "id",
    keyValue,
    limit = 50,
    nextToken,
    scanIndexForward = true,
  } = ctx.args;

  if (!keyValue) {
    util.appendError("Missing keyValue", "BadRequest");
  }

  const queryInput = {
    key: {
      name: keyName,
      value: keyValue,
    },
    limit,
    scanIndexForward,
  };

  if (nextToken) {
    queryInput.nextToken = nextToken;
  }

  return ddb.query(queryInput);
}

export function response(ctx) {
  const { error, result } = ctx;

  if (error) {
    util.appendError(error.message, error.type);
  }

  return {
    items: result.items,
    nextToken: result.nextToken,
  };
}
