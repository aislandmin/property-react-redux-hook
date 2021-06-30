import { Component } from "react";
import ListPage from "./views/list-page/list-page";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DetailPage from "./views/detail-page/detail-page";
import store from "./redux/store";
import { Provider } from "react-redux";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/detail/:id">
              <DetailPage />
            </Route>
            <Route path="/">
              <ListPage />
            </Route>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
