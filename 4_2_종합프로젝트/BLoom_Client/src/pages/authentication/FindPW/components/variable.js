// @mui icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";

const emailField = [
  {
    id: "userId",
    name: "userId",
    type: "userId",
    label: "userId",
    icon: <AccountCircleIcon />,
  },
];

const recoveryEmailField = [
  {
    id: "email",
    name: "email",
    type: "email",
    label: "email",
    icon: <EmailIcon />,
  },
];

const verifyKeyField = [
  {
    id: "verifyKey",
    name: "verifyKey",
    type: "verifyKey",
    label: "VerifyKey",
    icon: <KeyIcon />,
  },
];

export { emailField, recoveryEmailField, verifyKeyField };
