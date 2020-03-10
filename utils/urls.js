const prod = process.env.NODE_ENV === "production";

export default {
  baseUrl: prod ? "https://liv2bgirl.now.sh" : "http://localhost:3000",
  dbUrl: prod
    ? process.env.MONGO_DB
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
      notifications: "/app/notifications",
      profile: profileId => `/app/profile/${profileId}`,
      myProfile: "/app/profile",
      thread: threadId => `/app/groups/thread/${threadId}`,
    },
  },
  api: {
    login: () => "/api/login",
    signUp: () => "/api/signUp",
  },
};
