import React, { useState } from "react";
import './App.css';
import { Route } from 'react-router-dom';
import HomeView from './components/HomeView/HomeView';
import ProjectView from './components/ProjectView/ProjectView';
import User from './components/UserView/User';
import Header from "./components/Header";

function App() {

  const [logInModal, setLogInModal] = useState(false);

  return (
    <div className="App">
      <Header setLogInModal={setLogInModal} />
      <main>
        <Route path="/" 
          exact 
          render={() => 
            <HomeView 
              logInModal={logInModal}
            />
          }
         />
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
