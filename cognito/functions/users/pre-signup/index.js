export const handler = async (event) => {
  if (event.request.userAttributes.email) {
    event.response.autoConfirmUser = true;
    event.response.autoVerifyEmail = true;
  }

  return event;
};
