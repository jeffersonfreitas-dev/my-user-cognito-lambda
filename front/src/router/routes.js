const routes = [
  {
    path: "/",
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      {
        path: "",
        name: "login-default",
        component: () => import("src/pages/Login.vue"),
      },
      {
        path: "login",
        name: "login",
        component: () => import("src/pages/Login.vue"),
      },
      {
        path: "new",
        name: "new_account",
        component: () => import("src/pages/NewAccount.vue"),
      },
    ],
  },

  // {
  //   path: "/",
  //   component: () => import("layouts/MainLayout.vue"),
  //   children: [
  //     {
  //       path: "",
  //       name: "dashboard",
  //       component: () => import("pages/dashboard/Index.vue"),
  //     },
  //     {
  //       path: "locations",
  //       name: "locations",
  //       component: () => import("pages/location/List.vue"),
  //     },
  //     {
  //       path: "form-location/:id?",
  //       name: "form-location",
  //       component: () => import("pages/location/Form.vue"),
  //     },
  //     {
  //       path: "departments",
  //       name: "departments",
  //       component: () => import("pages/department/List.vue"),
  //     },
  //     {
  //       path: "form-department/:id?",
  //       name: "form-department",
  //       component: () => import("pages/department/Form.vue"),
  //     },
  //     {
  //       path: "positions",
  //       name: "positions",
  //       component: () => import("pages/position/List.vue"),
  //     },
  //     {
  //       path: "form-position/:id?",
  //       name: "form-position",
  //       component: () => import("pages/position/Form.vue"),
  //     },
  //     {
  //       path: "companies",
  //       name: "companies",
  //       component: () => import("pages/company/List.vue"),
  //     },
  //     {
  //       path: "form-company/:id?",
  //       name: "form-company",
  //       component: () => import("pages/company/Form.vue"),
  //     },
  //     {
  //       path: "groups",
  //       name: "groups",
  //       component: () => import("pages/group/List.vue"),
  //     },
  //     {
  //       path: "form-group/:id?",
  //       name: "form-group",
  //       component: () => import("pages/group/Form.vue"),
  //     },
  //     {
  //       path: "users",
  //       name: "users",
  //       component: () => import("pages/user/List.vue"),
  //     },
  //     {
  //       path: "form-user/:id?",
  //       name: "form-user",
  //       component: () => import("pages/user/Form.vue"),
  //     },
  //     {
  //       path: "detail-user/:id",
  //       name: "datail-user",
  //       component: () => import("pages/user/Detail.vue"),
  //     },
  //   ],
  //   meta: {
  //     requiresAuth: true,
  //   },
  // },

  // {
  //   path: "/",
  //   component: () => import("layouts/MyPageLayout.vue"),
  //   children: [
  //     {
  //       path: "",
  //       name: "mypage-default",
  //       component: () => import("src/pages/user/mypage/Index.vue"),
  //     },
  //     {
  //       path: "mypage",
  //       name: "mypage",
  //       component: () => import("src/pages/user/mypage/Index.vue"),
  //     },
  //     {
  //       path: "mydata",
  //       name: "mydata",
  //       component: () => import("src/pages/user/mypage/MyData.vue"),
  //     },
  //     {
  //       path: "password-reset",
  //       name: "password-reset",
  //       component: () => import("src/pages/user/mypage/PasswordReset.vue"),
  //     },
  //     {
  //       path: "user-messages",
  //       name: "user-messages",
  //       component: () => import("src/pages/user/mypage/UserMessages.vue"),
  //     },
  //   ],
  //   meta: {
  //     requiresAuth: true,
  //   },
  // },

  // {
  //   path: "/",
  //   component: () => import("layouts/MainLayout.vue"),
  //   children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  //   meta: {
  //     requiresAuth: true,
  //   },
  // },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
