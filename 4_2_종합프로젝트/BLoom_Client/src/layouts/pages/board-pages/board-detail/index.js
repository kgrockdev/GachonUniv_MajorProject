import { Box } from "@mui/material";

import BoardDetail from "pages/boardPages/BoardDetail/BoardDetail";
import NavBar from "layouts/navbar/Header";

export default function BoardDetailPage() {
  return (
    <Box>
      <NavBar />
      <BoardDetail />
    </Box>
  );
}
