import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateCardView from './view/CreatCard';
import MainView from './view/Main';

function App() {
  return (
    <Router>
      <div>
        <header style={{ textAlign: "center" }}>
          <span><h1>이것은 라이트너 암기법을 이용한 단어 암기 사이트이다.</h1></span>
        </header>
        <Switch>
          <Route path="/create">
            <CreateCardView />
          </Route>
          <Route path="/">
            <MainView />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
