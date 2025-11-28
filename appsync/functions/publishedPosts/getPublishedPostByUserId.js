import * as ddb from "@aws-appsync/utils/dynamodb";

export function request(ctx) {
  const { limit = 20, nextToken, userId } = ctx.arguments;
  return ddb.query({
    index: "publisedPostsByUserId",
    query: { userId: { eq: userId } },
    limit,
    nextToken,
  });
}

export function response(ctx) {
  const { items, nextToken } = ctx.result;
  return { items, nextToken };
}
