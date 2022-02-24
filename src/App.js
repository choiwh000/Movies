import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import Category from "./routes/Category";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/Movies/:id" element={Detail}>
          <Detail />
        </Route>
        <Route path={`${process.env.PUBLIC_URL}/`} element={Home}>
          <Home />
        </Route>
        <Route path="/category" element={Category}>
          <Category />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
