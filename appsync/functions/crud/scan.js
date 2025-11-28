import { util } from "@aws-appsync/utils";
import * as ddb from "@aws-appsync/utils/dynamodb";

export function request(ctx) {
  const { limit = 20, nextToken, filter } = ctx.args;

  const scanInput = {
    limit,
    nextToken,
  };

  // Only include the filter if it's provided
  if (filter) {
    scanInput.filter = filter;
  }

  return ddb.scan(scanInput);
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
