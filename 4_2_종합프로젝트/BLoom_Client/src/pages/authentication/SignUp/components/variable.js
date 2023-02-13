// @mui
import { Radio } from "@mui/material";

// @mui icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HttpsIcon from "@mui/icons-material/Https";
import EmailIcon from "@mui/icons-material/Email";

const nameField = [
  {
    id: "name",
    name: "name",
    type: "name",
    label: "Name",
    icon: <AccountCircleIcon />,
  },
];

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

const recoveryEmailField = [
  {
    id: "recoveryEmail",
    name: "recoveryEmail",
    type: "recoveryEmail",
    label: "RecoveryEmail",
    icon: <EmailIcon />,
  },
];

const genderRadioBtn = (
  <Radio color="bloomColor" size="small" sx={{ color: "gray" }} />
);

const genderField = [
  {
    value: "male",
    label: "남자",
    control: genderRadioBtn,
  },
  {
    value: "female",
    label: "여자",
    control: genderRadioBtn,
  },
  {
    value: "other",
    label: "기타",
    control: genderRadioBtn,
  },
];

const yearField = () => {
  var years = [];

  for (var i = 1900; i < 2023; i++) years.push(i);

  return years;
};

const monthField = () => {
  var months = [];

  for (var i = 1; i < 13; i++) months.push(i);

  return months;
};

const dayField = () => {
  var days = [];

  for (var i = 1; i < 32; i++) days.push(i);

  return days;
};

export {
  nameField,
  loginField,
  recoveryEmailField,
  genderField,
  yearField,
  monthField,
  dayField,
};
