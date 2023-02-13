// @mui icons
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";

const recoveryEmailField = [
  {
    id: "recoveryEmail",
    name: "recoveryEmail",
    type: "recoveryEmail",
    label: "RecoveryEmail",
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

export { recoveryEmailField, verifyKeyField };
