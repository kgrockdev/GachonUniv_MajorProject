import { Box } from "@mui/material";

import EditBoard from "pages/boardPages/EditBoard/EditBoard";
import NavBar from "layouts/navbar/Header";

export default function EditBoardPage() {
  return (
    <Box>
      <NavBar />
      <EditBoard />
    </Box>
  );
}
