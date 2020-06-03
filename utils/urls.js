const prod = process.env.NODE_ENV === "production";

export default {
  baseUrl: prod ? process.env.BASE_URL : `http://localhost:3000`,
  dbUrl: process.env.MONGODB,
  dbName: "liv2bgirl",
  pages: {
    index: "/",
    signUp: "/sign-up",
    signIn: "/sign-in",
    app: {
      home: "/app",
      thread: threadId => `/app/thread/${threadId}`,
      createThread: groupId => `/app/groups/${groupId}/new-thread`,
      groupList: "/app/groups",
      group: groupId => `/app/groups/${groupId}`,
      newGroup: "/app/new-group",
      askMe: "/app/ask-me",
      askQuestion: "/app/ask-me/new",
      viewQuestion: questionId => `/app/ask-me/view/${questionId}`,
      notifications: "/app/notifications",
      profile: profileId => `/app/profile/${profileId}`,
    },
  },
  api: {
    askMe: {
      createThread: () => "/api/ask-me/createThread",
      deleteThread: () => "/api/ask-me/deleteThread",
      filterThreads: () => "/api/ask-me/filterThreads",
      searchThreads: () => "/api/ask-me/searchThreads",
      getThread: () => "/api/ask-me/getThread",
      getAskThreads: () => "/api/ask-me/getAskThreads",
      getUserQuestions: () => "/api/ask-me/getUserQuestions",
    },
    categories: {
      getCategories: () => "/api/categories/getCategories",
    },
    comments: {
      createComment: () => "/api/comments/createComment",
      deleteComment: () => "/api/comments/deleteComment",
      getCommentsByThread: () => "/api/comments/getCommentsByThread",
      getCommentsByAskMeThread: () => "/api/comments/getCommentsByAskMeThread",
    },
    groups: {
      createGroup: () => "/api/groups/createGroup",
      deleteGroup: () => "/api/groups/deleteGroup",
      getGroup: () => "/api/groups/getGroup",
      followGroup: () => "/api/groups/followGroup",
      unfollowGroup: () => "/api/groups/unfollowGroup",
      searchGroups: () => "/api/groups/searchGroups",
    },
    invitationCode: {
      createCode: () => "/api/invitation-code/createCode",
      verifyCodeUnused: () => "/api/invitation-code/verifyCodeUnused",
    },
    threads: {
      createThread: () => "/api/threads/createThread",
      deleteThread: () => "/api/threads/deleteThread",
      filterThreads: () => "/api/threads/filterThreads",
      searchThreads: () => "/api/threads/searchThreads",
      getThread: () => "/api/threads/getThread",
      getGroupThreads: () => "/api/threads/getGroupThreads",
    },
    user: {
      login: () => "/api/user/login",
      signUp: () => "/api/user/signUp",
      getCurrentUser: () => "/api/user/getCurrentUser",
      getUser: () => "/api/user/getUser",
      followUser: () => "/api/user/followUser",
      unfollowUser: () => "/api/user/unfollowUser",
      getAskBookmarks: () => "/api/user/getAskBookmarks",
      addAskBookmark: () => "/api/user/addAskBookmark",
      removeAskBookmark: () => "/api/user/removeAskBookmark",
      getUserAskBookmarks: () => "/api/user/getUserAskBookmarks",
      verifyEmailUnused: () => "/api/user/verifyEmailUnused",
    },
  },
};
