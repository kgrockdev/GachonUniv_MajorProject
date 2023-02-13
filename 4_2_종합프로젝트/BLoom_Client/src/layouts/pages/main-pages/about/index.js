import { Box } from "@mui/material";

import AboutIndex from "pages/mainPages/About/about";
import NavBar from "layouts/navbar/Header";

export default function About() {
  return (
    <Box>
      <NavBar />
      <AboutIndex />
    </Box>
  );
}