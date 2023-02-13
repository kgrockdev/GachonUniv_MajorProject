// @mui icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HttpsIcon from "@mui/icons-material/Https";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

const loginField = [
  {
    id: "userID",
    name: "userID",
    type: "userID",
    label: "userID",
    icon: <AccountCircleIcon />,
  },
  {
    id: "password",
    name: "password",
    type: "password",
    label: "Password",
    icon: <HttpsIcon />,
  },
];

const socialLoginField = [
  {
    label: "facebook",
    color: "facebookBtn",
    text: "페이스북으로 시작하기",
    icon: <FacebookIcon />,
  },
  {
    label: "twitter",
    color: "twitterBtn",
    text: "트위터로 시작하기",
    icon: <TwitterIcon />,
  },
];

const accountManageBtn = [
  {
    key: "findPW",
    text: "비밀번호 찾기",
    link: "/authentication/find-pw",
  },
  {
    key: "findID",
    text: "아이디 찾기",
    link: "/authentication/find-id",
  },
  {
    key: "findRegister",
    text: "회원가입",
    link: "/authentication/sign-up",
  },
];

export { loginField, socialLoginField, accountManageBtn };
