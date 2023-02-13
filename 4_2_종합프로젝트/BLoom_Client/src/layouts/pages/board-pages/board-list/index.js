import { Box } from "@mui/material";

import BoardList from "pages/boardPages/BoardList/BoardList";
import NavBar from "layouts/navbar/Header";

export default function BoardListPage() {
  return (
    <Box>
      <NavBar />
      <BoardList />
    </Box>
  );
}
