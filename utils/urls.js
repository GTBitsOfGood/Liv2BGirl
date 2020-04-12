const prod = process.env.NODE_ENV === "production";

export default {
  baseUrl: prod
    ? process.env.BASE_URL || "https://liv2bgirl.now.sh"
    : "http://localhost:3000",
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
      groupList: "/app/groups",
      group: groupId => `/app/groups/${groupId}`,
      askMe: "/app/ask-me",
      askquestion: "/app/ask-me/new",
      viewQuestion: questionId => `/app/ask-me/view/${questionId}`,
      notifications: "/app/notifications",
      profile: profileId => `/app/profile/${profileId}`,
      myProfile: "/app/profile",
      thread: threadId => `/app/groups/thread/${threadId}`,
      createThread: groupId => `/app/groups/${groupId}/new-thread`,
      newgroup: "/app/groups/new",
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
    searchThread: () => "/api/threads/searchThread",
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
