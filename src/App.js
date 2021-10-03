import { useState, useEffect } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import HomeView from './components/HomeView/HomeView';
import ProjectView from './components/ProjectView/ProjectView';
import User from './components/UserView/User';
import Header from "./components/Header";
import NewUserModal from './components/Modals/NewUserModal';
import NewProjectModal from "./components/Modals/NewProjectModal";
import { DataContext } from "./DataContext";
import SplashPage from './components/SplashPage';

function App() {

  const defaultUser = {name: 'guest', id: 0, img: '#'}
  const [logInModal, setLogInModal] = useState(false);
  const [newUserModal, setNewUserModal] = useState(false);
  const [newProjectModal, setNewProjectModal] = useState(false);
  const [thisUser, setThisUser] = useState(defaultUser);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const URL = 'https://datacollectivebackend.herokuapp.com'

    //check whether there is a user in localstorage
    function checkSessionUser() {
      const sessionName = localStorage.getItem("name");
      const sessionID = parseInt(localStorage.getItem("id"));
      const sessionImg = localStorage.getItem("img");
      if (sessionName && sessionID) {
        setThisUser({...thisUser, name: sessionName, id: sessionID, img: sessionImg});
        setIsLoggedIn(true);
      } else {
        setThisUser(defaultUser);
        setIsLoggedIn(false);
      }
    }

    useEffect(() => {
      checkSessionUser()
    }, [logInModal, newUserModal, newProjectModal]);

    
  return (
    <div className="App">
      <div className='background-div'></div>
      <DataContext.Provider value={{
        thisUser, 
        setThisUser, 
        URL,
        defaultUser,
        setIsLoggedIn
      }}>
      {(newUserModal === true) && 
        <NewUserModal setNewUserModal={setNewUserModal}/>
      }
      {(newProjectModal === true) && 
        <NewProjectModal setNewProjectModal={setNewProjectModal} />
      }
      <Header 
        logInModal={logInModal}
        setLogInModal={setLogInModal} 
        setNewUserModal={setNewUserModal}
        setNewProjectModal={setNewProjectModal}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <main>
        <Route path='/'
          exact
          render={() => 
            <SplashPage newUserModal={newUserModal} setNewUserModal={setNewUserModal} />
          }
        />
        <Route path="/projects" 
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
