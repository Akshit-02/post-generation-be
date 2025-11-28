/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const analyzeCommentsBatch = /* GraphQL */ `
  query AnalyzeCommentsBatch($comments: [String!]) {
    analyzeCommentsBatch(comments: $comments) {
      commentId
      analysis {
        vulgarity {
          score
          detected
          keywords
          __typename
        }
        nudity {
          score
          detected
          keywords
          __typename
        }
        violence {
          score
          detected
          keywords
          __typename
        }
        hate_speech {
          score
          detected
          keywords
          __typename
        }
        spam {
          score
          detected
          keywords
          __typename
        }
        harassment {
          score
          detected
          keywords
          __typename
        }
        overall_risk
        language_detected
        summary
        error
        script_detected
        cultural_context
        requires_human_review
        error_message
        analyzed_at
        is_hinglish
        __typename
      }
      __typename
    }
  }
`;
export const getMediaFromInstagramAccount = /* GraphQL */ `
  query GetMediaFromInstagramAccount($userId: String!, $nextPageToken: String) {
    getMediaFromInstagramAccount(
      userId: $userId
      nextPageToken: $nextPageToken
    ) {
      success
      message
      items {
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
      nextPageToken
      __typename
    }
  }
`;
export const getMediaCommentsFromInstagramAccount = /* GraphQL */ `
  query GetMediaCommentsFromInstagramAccount(
    $userId: String!
    $mediaId: String!
    $nextPageToken: String
  ) {
    getMediaCommentsFromInstagramAccount(
      userId: $userId
      mediaId: $mediaId
      nextPageToken: $nextPageToken
    ) {
      success
      message
      items {
        id
        text
        senderId
        senderUsername
        isHidden
        timestamp
        likeCount
        replies {
          id
          text
          senderId
          senderUsername
          isHidden
          timestamp
          likeCount
          replies {
            id
            text
            senderId
            senderUsername
            isHidden
            timestamp
            likeCount
            replies {
              id
              text
              senderId
              senderUsername
              isHidden
              timestamp
              likeCount
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      nextPageToken
      __typename
    }
  }
`;
export const getConversationsFromInstagramAccount = /* GraphQL */ `
  query GetConversationsFromInstagramAccount($userId: String!) {
    getConversationsFromInstagramAccount(userId: $userId) {
      success
      message
      items {
        id
        user2Id
        user2Username
        __typename
      }
      __typename
    }
  }
`;
export const getConversationMessagesFromInstagramAccount = /* GraphQL */ `
  query GetConversationMessagesFromInstagramAccount(
    $userId: String!
    $conversationId: String!
    $nextPageToken: String
  ) {
    getConversationMessagesFromInstagramAccount(
      userId: $userId
      conversationId: $conversationId
      nextPageToken: $nextPageToken
    ) {
      success
      message
      items {
        id
        fromId
        fromUsername
        message
        createdTime
        __typename
      }
      __typename
    }
  }
`;
