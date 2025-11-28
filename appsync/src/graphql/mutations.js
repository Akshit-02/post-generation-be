/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const manageIgMediaAutomation = /* GraphQL */ `
  mutation ManageIgMediaAutomation(
    $action: API_ACTIONS!
    $input: IgMediaAutomationInput!
  ) {
    manageIgMediaAutomation(action: $action, input: $input) {
      success
      message
      items {
        id
        userId
        mediaType
        mediaUrl
        postedAt
        isActive
        automationType
        automationTrigger
        keywords
        replyCommentText
        replyDMType
        replyDMText
        replyDMMediaUrl
        replyDMCards {
          mediaUrl
          title
          buttons {
            title
            link
            __typename
          }
          __typename
        }
        mediaDetails {
          id
          caption
          mediaType
          mediaProductType
          mediaUrl
          thumbnailUrl
          permalink
          timestamp
          commentsCount
          likeCount
          shortcode
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      __typename
    }
  }
`;
export const deleteCommentFromInstagramAccount = /* GraphQL */ `
  mutation DeleteCommentFromInstagramAccount(
    $userId: String!
    $commentId: String!
  ) {
    deleteCommentFromInstagramAccount(userId: $userId, commentId: $commentId) {
      success
      message
      __typename
    }
  }
`;
export const hideCommentFromInstagramAccount = /* GraphQL */ `
  mutation HideCommentFromInstagramAccount(
    $userId: String!
    $commentId: String!
    $hide: Boolean!
  ) {
    hideCommentFromInstagramAccount(
      userId: $userId
      commentId: $commentId
      hide: $hide
    ) {
      success
      message
      __typename
    }
  }
`;
export const sendReplyToComment = /* GraphQL */ `
  mutation SendReplyToComment(
    $userId: String!
    $commentId: String!
    $replyContent: String!
  ) {
    sendReplyToComment(
      userId: $userId
      commentId: $commentId
      replyContent: $replyContent
    ) {
      success
      message
      __typename
    }
  }
`;
export const publishInstagramContent = /* GraphQL */ `
  mutation PublishInstagramContent(
    $userId: String!
    $media: PublishInstagramContentInput!
  ) {
    publishInstagramContent(userId: $userId, media: $media) {
      success
      message
      mediaId
      permalink
      __typename
    }
  }
`;
export const sendInstagramMessage = /* GraphQL */ `
  mutation SendInstagramMessage(
    $userId: String!
    $conversationId: String!
    $message: String!
  ) {
    sendInstagramMessage(
      userId: $userId
      conversationId: $conversationId
      message: $message
    ) {
      success
      message
      messageId
      __typename
    }
  }
`;
export const manageUser = /* GraphQL */ `
  mutation ManageUser($action: API_ACTIONS!, $input: UserInput!) {
    manageUser(action: $action, input: $input) {
      success
      message
      items {
        id
        name
        phoneNo
        email
        instagramDetails {
          id
          userId
          profilePictureUrl
          username
          name
          accountType
          followersCount
          followsCount
          mediaCount
          isInstagramSubscribed
          instagramRefreshTokenUpdatedAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      __typename
    }
  }
`;
export const linkInstagramAccount = /* GraphQL */ `
  mutation LinkInstagramAccount($input: LinkInstagramAccountInput!) {
    linkInstagramAccount(input: $input) {
      success
      message
      __typename
    }
  }
`;
