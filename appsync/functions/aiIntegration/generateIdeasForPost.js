export function request(ctx) {
  const { source, args } = ctx;
  return {
    operation: "Invoke",
    payload: {
      arguments: args,
      source,
      identity: ctx.identity,
      fieldName: "generateIdeasForPost",
    },
  };
}

export function response(ctx) {
  return ctx.result;
}
