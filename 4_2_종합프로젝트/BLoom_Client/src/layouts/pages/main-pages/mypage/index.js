import { Box } from "@mui/material";

import MyPageIndex from "pages/mainPages/MyPage/MyPage";
import NavBar from "layouts/navbar/Header";

export default function MyPage() {
  return (
    <Box>
      <NavBar />
      <MyPageIndex />
    </Box>
  );
}
