import React, { useContext } from 'react';
import './Header.css';
import { DataContext } from '../DataContext';
import { useEffect } from 'react/cjs/react.development';

const Header = ({setLogInModal, setNewUserModal, setNewProjectModal, isLoggedIn, setIsLoggedIn}) => {

    const {thisUser, setThisUser } = useContext(DataContext);

    const logOut = () => {
        setThisUser(null)
        setIsLoggedIn(false)
        localStorage.clear()
    }

    useEffect(() => {

      }, []);

    if(isLoggedIn){
        return (
            <div className='Header'>
                <div className='site-logo'>
                    <h1><a className='home-link' href='/'>DataCollective</a></h1>
                </div>
                <div className='user-interaction'>
                    <a className="profile user" href={`/citizens/${thisUser.id}`}>
                        <h4>{thisUser.name}</h4>
                        <img className="profile-pic" src={thisUser.img} alt="profile"/>
                    </a>
                    <div className="profile button">
                        <button type='button' onClick={() => setNewProjectModal(true)}>new project</button>
                        <button type='button' onClick={logOut}>log out</button>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className='Header'>
                <div className='site-logo'>
                    <h1><a className='home-link' href='/'>DataCollective</a></h1>
                </div>
                <div className='user-interaction'>
                    <button type='button' onClick={() => setLogInModal(true)}>log in</button>
                    <button type='button' onClick={() => setNewUserModal(true)}>new user</button>
                </div>
            </div>
        )
    }
};

export default Header;