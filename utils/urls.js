const prod = process.env.NODE_ENV === "production";

export default {
  baseUrl: prod
    ? process.env.BASE_URL || "https://liv2bgirl.now.sh"
    : `http://localhost:3000`,
  dbUrl: prod
    ? process.env.MONGODB
    : process.env.MONGO_DEV_DB || "mongodb://localhost:27017",
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
    login: () => "/api/user/login",
    signUp: () => "/api/user/signUp",
    getCurrentUser: () => "/api/user/getCurrentUser",
    getUser: () => "/api/user/getUser",
    followUser: () => "/api/user/followUser",
    unfollowUser: () => "/api/user/unfollowUser",
    createThread: () => "/api/threads/createThread",
    deleteThread: () => "/api/threads/deleteThread",
    filterThread: () => "/api/threads/filterThread",
    searchThreads: () => "/api/threads/searchThreads",
    getThread: () => "/api/threads/getThread",
    getGroupThreads: () => "/api/threads/getGroupThreads",
    getUserQuestions: () => "/api/threads/getUserQuestions",
    createGroup: () => "/api/groups/createGroup",
    deleteGroup: () => "/api/groups/deleteGroup",
    getGroup: () => "/api/groups/getGroup",
    followGroup: () => "/api/groups/followGroup",
    unfollowGroup: () => "/api/groups/unfollowGroup",
    createComment: () => "/api/comments/createComment",
    deleteComment: () => "/api/comments/deleteComment",
    getCommentsByThread: () => "/api/comments/getCommentsByThread",
  },
};
