import { useState, useEffect } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import HomeView from './components/HomeView/HomeView';
import ProjectView from './components/ProjectView/ProjectView';
import User from './components/UserView/User';
import Header from "./components/Header";
import LogInModal from './components/Modals/LogInModal.jsx'
import NewUserModal from './components/Modals/NewUserModal';
import NewProjectModal from "./components/Modals/NewProjectModal";
import { DataContext } from "./DataContext";

function App() {

  const [logInModal, setLogInModal] = useState(false);
  const [newUserModal, setNewUserModal] = useState(false);
  const [newProjectModal, setNewProjectModal] = useState(false);
  const [thisUser, setThisUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

    //check whether there is a user in localstorage

    useEffect(() => {
      const sessionName = localStorage.getItem("name");
      const sessionID = localStorage.getItem("id");
      if (sessionName && sessionID) {
        setThisUser({...thisUser, name: sessionName, id: sessionID});
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }, []);

    
  return (
    <div className="App">
      <DataContext.Provider value={{
        thisUser, 
        setThisUser
      }}>
      {(logInModal === true) && 
        <LogInModal setLogInModal={setLogInModal}/>
      }
      {(newUserModal === true) && 
        <NewUserModal setNewUserModal={setNewUserModal}/>
      }
      {(newProjectModal === true) && 
        <NewProjectModal setNewProjectModal={setNewProjectModal} />
      }
      <Header 
        setLogInModal={setLogInModal} 
        setNewUserModal={setNewUserModal}
        setNewProjectModal={setNewProjectModal}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
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
