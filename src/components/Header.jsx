import React, { useContext } from 'react';
import './Header.css';
import { DataContext } from '../DataContext';

const Header = ({setLogInModal, setNewProjectModal, isLoggedIn, setIsLoggedIn}) => {

    const {thisUser, setThisUser } = useContext(DataContext);

    const logOut = () => {
        setThisUser(null)
        setIsLoggedIn(false)
        localStorage.clear()
    }

    if(isLoggedIn){
        return (
            <div className='Header'>
                <div className='site-logo'>
                    <h1><a className='home-link' href='/'>DataCollective</a></h1>
                </div>
                <div className='user-interaction'>
                    <h4>{thisUser.name}</h4>
                    <button type='button' onClick={() => setNewProjectModal(true)}>new project</button>
                    <button type='button' onClick={logOut}>log out</button>
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
                    <button type='button'>new user</button>
                </div>
            </div>
        )
    }
};

export default Header;