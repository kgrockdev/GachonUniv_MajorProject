import { Box } from "@mui/material";

import AddBoard from "pages/boardPages/AddBoard/AddBoard";
import NavBar from "layouts/navbar/Header";

export default function AddBoardPage() {
  return (
    <Box>
      <NavBar />
      <AddBoard />
    </Box>
  );
}
