import SignIn from "layouts/pages/authentication/sign-in";
import SignUp from "layouts/pages/authentication/sign-up";
import FindID from "layouts/pages/authentication/find-id";
import FindPW from "layouts/pages/authentication/find-pw";

import BoardList from "layouts/pages/board-pages/board-list";
import BoardDetail from "layouts/pages/board-pages/board-detail";
import BoardEdit from "layouts/pages/board-pages/board-edit";

import MyPage from "layouts/pages/main-pages/mypage";
import About from "layouts/pages/main-pages/about";

const routes = [
  {
    name: "authentication",
    group: [
      {
        name: "sign in",
        route: "authentication/sign-in",
        component: <SignIn />,
      },
      {
        name: "sign up",
        route: "authentication/sign-up",
        component: <SignUp />,
      },
      {
        name: "find id",
        route: "authentication/find-id",
        component: <FindID />,
      },
      {
        name: "find pw",
        route: "authentication/find-pw",
        component: <FindPW />,
      },
    ],
  },
  {
    name: "boardPage",
    group: [
      {
        name: "board list",
        route: "board",
        component: <BoardList />,
      },
      {
        name: "board",
        route: "board/:board_id",
        component: <BoardDetail />,
      },
      {
        name: "edit board",
        route: "board/edit/:board_id",
        component: <BoardEdit />,
      },
      // {
      //   name: "add board",
      //   route: "board/add",
      //   component: <BoardAdd />,
      // },
    ],
  },
  {
    name: "myPage",
    group: [
      {
        name: "mypage",
        route: "mypage",
        component: <MyPage />,
      },
      {
        name: "about",
        route: "about",
        component: <About />,
      },
    ],
  },
];

export default routes;
