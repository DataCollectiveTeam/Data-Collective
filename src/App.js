import React from "react";
import './App.css';
import { Route } from 'react-router-dom';
import HomeView from './components/HomeView/HomeView';
import ProjectView from './components/ProjectView/ProjectView';
import User from './components/UserView/User';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a href="/">Data Collective</a>
      </header>
      <main>
        <Route path="/" exact component={HomeView} />
        <Route
          path="/projects/:id"
          exact
          render={(routerProps) =>
            <ProjectView
              id={routerProps.match.params.id}
            />
          }
          />
          <Route
          path="/citizens/:id"
          exact
          render={(routerProps) =>
            <User
              id={routerProps.match.params.id}
            />
          }
          />
      </main>
    </div>
  );
}

export default App;
