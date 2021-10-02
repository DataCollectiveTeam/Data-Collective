import React, { useContext, useState, useEffect } from 'react';
import './Header.css';
import { DataContext } from '../DataContext';
import { Redirect } from 'react-router';
import LogInModal from './Modals/LogInModal';

const Header = ({logInModal, setLogInModal, setNewUserModal, setNewProjectModal, isLoggedIn, setIsLoggedIn}) => {

    const {thisUser, setThisUser, defaultUser } = useContext(DataContext);
    const [loggedOut, setLoggedOut] = useState(false);

    const logOut = () => {
        setLoggedOut(true);
        setThisUser(defaultUser)
        localStorage.clear()
        setIsLoggedIn(false)
    }

    useEffect(() => {

      }, [isLoggedIn, loggedOut, logInModal, thisUser]);

    if(isLoggedIn){
        return (
            <div className='Header'>
                <div className='site-logo'>
                    <h1><a className='home-link' href='/projects'>DataCollective</a></h1>
                </div>
                <div className='user-interaction'>
                    <a className="profile user" href={`/citizens/${thisUser.id}`}>
                        <h4>{thisUser.name}</h4>
                        <img className="profile-pic" src={thisUser.img} alt="profile"/>
                    </a>
                    <div className="interaction-buttons">
                        <button className='interaction-button' type='button' onClick={() => setNewProjectModal(true)}>new project</button>
                        <button className='interaction-button' type='button' onClick={logOut}>log out</button>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className='Header'>
                {loggedOut &&
                    <Redirect to='/projects' />
                }
                {(logInModal === true) && 
                    <LogInModal setLogInModal={setLogInModal}/>
                }
                <div className='site-logo'>
                    <h1><a className='home-link' href='/projects'>DataCollective</a></h1>
                </div>
                <div className='profile-buttons'>
                    <button className='interaction-button' type='button' onClick={() => setLogInModal(true)}>log in</button>
                    <button className='interaction-button' type='button' onClick={() => setNewUserModal(true)}>new user</button>
                </div>
            </div>
        )
    }
};

export default Header;