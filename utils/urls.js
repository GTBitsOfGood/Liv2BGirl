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
    login: () => "/api/login",
    signUp: () => "/api/signUp",
    createThread: () => "/api/threads/createThread",
    followGroup: () => "/api/groups/followGroup",
    unfollowGroup: () => "/api/groups/unfollowGroup",
    createGroup: () => "/api/groups/createGroup",
    getCurrentUser: () => "/api/user/getCurrentUser",
    getUser: () => "/api/user/getUser",
    getGroup: () => "/api/groups/getGroup",
    getCommentsByThread: () => "/api/comments/getCommentsByThread",
  },
};
