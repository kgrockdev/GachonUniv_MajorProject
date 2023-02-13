import { useEffect } from "react";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui/styles
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";

// @mui material components
import CssBaseline from "@mui/material/CssBaseline";

// Routes
import routes from "routes";
import PrivateRoute from "PrivateRoute";
import Index from "layouts/pages/main-pages/index";
import BoardAdd from "layouts/pages/board-pages/board-add";

function App() {
  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.group) {
        return getRoutes(route.group);
      }

      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            element={route.component}
            key={route.key}
          />
        );
      }

      return null;
    });

  return (
    <div className="App">
      <div className="App-header"></div>
      <div className="App-body">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {getRoutes(routes)}
            <Route path="/index" element={<Index />} />
            <Route path="*" element={<Navigate to="/index" />} />
            <Route path="/board/add" element={<PrivateRoute path="/board/add" component={BoardAdd}/>}/>
          </Routes>
        </ThemeProvider>
      </div>
      <div className="App-footer"></div>
    </div>
  );
}

export default App;
