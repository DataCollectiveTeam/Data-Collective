import React, { useState } from "react";
import './App.css';
import { Route } from 'react-router-dom';
import HomeView from './components/HomeView/HomeView';
import ProjectView from './components/ProjectView/ProjectView';
import User from './components/UserView/User';
import Header from "./components/Header";
import LogInModal from './components/Modals/LogInModal.jsx'
import NewProjectModal from "./components/Modals/NewProjectModal";
import { DataContext } from "./DataContext";

function App() {

  const [logInModal, setLogInModal] = useState(false);
  const [newProjectModal, setNewProjectModal] = useState(false);
  const [thisUser, setThisUser] = useState(null);

  return (
    <div className="App">
      <DataContext.Provider value={{
        thisUser, 
        setThisUser
      }}>
      {(logInModal === true) && 
        <LogInModal setLogInModal={setLogInModal}/>
      }
      {(newProjectModal === true) && 
        <NewProjectModal setNewProjectModal={setNewProjectModal} />
      }
      <Header 
        setLogInModal={setLogInModal} 
        setNewProjectModal={setNewProjectModal}
      />
      <main>
        <Route path="/" 
          exact 
          render={() => 
            <HomeView />
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
      </DataContext.Provider>
    </div>
  );
}

export default App;
