const prod = process.env.NODE_ENV === "production";

export default {
  baseUrl: prod ? "https://liv2bgirl.now.sh" : "http://localhost:3000",
  dbUrl: prod
    ? process.env.MONGO_DB
    : process.env.MONGO_DEV_DB || "mongodb://localhost:27017",
  dbName: "liv2bgirl",
  pages: {
    index: "/",
    ssr: "/ssr"
  },
  api: {
    example: () => "/api/example",
    login: () => "/api/login",
    signUp : () => "/api/signUp"
  }
};
