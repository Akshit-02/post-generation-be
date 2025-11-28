import { util } from "@aws-appsync/utils";

export function request(ctx) {
  const { input } = ctx.args;

  return {
    operation: "DeleteItem",
    key: util.dynamodb.toMapValues({ id: input.id }),
  };
}

export function response(ctx) {
  return ctx.result;
}
