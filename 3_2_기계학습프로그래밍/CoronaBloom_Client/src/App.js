import "antd/dist/antd.css";
import "./App.css";
import MainPage from "./main/index";
import ResultPage from "./result/index";
import { Link, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      {/* Header */}
      <div id="header">
        <div id="header-area">
          <Link to="/">
            <span id="logo">BLoom</span>
          </Link>
        </div>
      </div>
      <div id="body">
        <Switch>
          <Route exact={true} path={"/"}>
            <MainPage />
          </Route>
          <Route exact={true} path={"/result"}>
            <ResultPage />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
