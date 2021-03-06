const prod = process.env.NODE_ENV === "production";

const localWithPort = process.env.PORT
  ? `http://localhost:${process.env.PORT}`
  : "http://localhost:3000";

export default {
  baseUrl: prod ? process.env.BASE_URL ?? localWithPort : localWithPort,
  dbUrl: process.env.MONGODB,
  dbName: "liv2bgirl",
  pages: {
    index: "/",
    signUp: "/sign-up",
    signIn: "/sign-in",
    app: {
      index: "/app",
      admin: {
        index: "/app/admin",
        invite: "/app/admin/invite",
        reports: "/app/admin/reports",
        posts: "/app/admin/posts",
      },
      askMe: {
        index: "/app/ask-me",
        askQuestion: "/app/ask-me/new",
        questions: {
          view: (questionId) =>
            `/app/ask-me/view/${questionId ?? "[threadid]"}`,
        },
      },
      groups: {
        index: "/app/groups",
        newGroup: "/app/groups/new",
        group: {
          view: (groupId) => `/app/groups/view/${groupId ?? "[groupid]"}`,
          threads: {
            createThread: (groupId) =>
              `/app/groups/view/${groupId ?? "[groupid]"}/new-thread`,
            view: (groupId, threadId) =>
              `/app/groups/view/${groupId ?? "[groupid]"}/thread/${
                threadId ?? "[threadid]"
              }`,
          },
        },
      },
      notifications: {
        index: "/app/notifications",
      },
      profile: {
        view: (profileId) => `/app/profile/${profileId ?? "[userid]"}`,
      },
      post: {
        index: "/app/post/createPost",
        success: "app/post/postSuccessful",
      },
    },
  },
  api: {
    askMeThread: {
      createThread: () => "/api/AskMeThread/createThread",
      deleteThread: () => "/api/AskMeThread/deleteThread",
      editThread: () => "/api/AskMeThread/editThread",
      filterThreads: () => "/api/AskMeThread/filterThreads",
      reportThread: () => "/api/AskMeThread/reportThread",
      unreportThread: () => "/api/AskMeThread/unreportThread",
      searchThreads: () => "/api/AskMeThread/searchThreads",
      getReportedThreads: () => "/api/AskMeThread/getReportedThreads",
      getThread: () => "/api/AskMeThread/getThread",
      getAskThreads: () => "/api/AskMeThread/getAskThreads",
      getUserQuestions: () => "/api/AskMeThread/getUserQuestions",
    },
    category: {
      getCategories: () => "/api/Category/getCategories",
    },
    comment: {
      createComment: () => "/api/Comment/createComment",
      deleteComment: () => "/api/Comment/deleteComment",
      editComment: () => "/api/Comment/editComment",
      getCommentsByThread: () => "/api/Comment/getCommentsByThread",
      getCommentsByAskMeThread: () => "/api/Comment/getCommentsByAskMeThread",
      getReportedComments: () => "/api/Comment/getReportedComments",
      reportComment: () => "/api/Comment/reportComment",
      unreportComment: () => "/api/Comment/unreportComment",
    },
    group: {
      createGroup: () => "/api/Group/createGroup",
      deleteGroup: () => "/api/Group/deleteGroup",
      getGroup: () => "/api/Group/getGroup",
      searchGroups: () => "/api/Group/searchGroups",
    },
    invitationCode: {
      createCode: () => "/api/InvitationCode/createCode",
      verifyCodeUnused: () => "/api/InvitationCode/verifyCodeUnused",
    },
    groupThread: {
      createThread: () => "/api/GroupThread/createThread",
      deleteThread: () => "/api/GroupThread/deleteThread",
      reportThread: () => "/api/GroupThread/reportThread",
      unreportGroupThread: () => "/api/GroupThread/unreportGroupThread",
      filterThreads: () => "/api/GroupThread/filterThreads",
      searchThreads: () => "/api/GroupThread/searchThreads",
      getThread: () => "/api/GroupThread/getThread",
      getGroupThreads: () => "/api/GroupThread/getGroupThreads",
      getReportedGroupThreads: () => "/api/GroupThread/getReportedGroupThreads",
    },
    post: {
      getApprovedPosts: () => "/api/Post/getApprovedPosts", 
      getPendingPosts: () => "/api/Post/getPendingPosts",
      approvePost: () => "/api/Post/approvePost",
      createPost: () => "/api/Post/createPost", 
      deletePost: () => "/api/Post/deletePost",
    },
    user: {
      login: () => "/api/User/login",
      signUp: () => "/api/User/signUp",
      getCurrentUser: () => "/api/User/getCurrentUser",
      getUser: () => "/api/User/getUser",
      followUser: () => "/api/User/followUser",
      unfollowUser: () => "/api/User/unfollowUser",
      followGroup: () => "/api/User/followGroup",
      unfollowGroup: () => "/api/User/unfollowGroup",
      getUserAskBookmarks: () => "/api/User/getUserAskBookmarks",
      addAskBookmark: () => "/api/User/addAskBookmark",
      removeAskBookmark: () => "/api/User/removeAskBookmark",
      getUserGroupBookmarks: () => "/api/User/getUserGroupBookmarks",
      addGroupBookmark: () => "/api/User/addGroupBookmark",
      removeGroupBookmark: () => "/api/User/removeGroupBookmark",
      verifyEmailUnused: () => "/api/User/verifyEmailUnused",
      generateUsernames: () => "/api/User/generateUsernames",
    },
  },
};
