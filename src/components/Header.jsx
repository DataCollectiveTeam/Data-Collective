import React from 'react';
import './Header.css';

const Header = ({setLogInModal}) => {
    return (
        <div className='Header'>
            <div className='site-logo'>
                <h1><a className='home-link' href='/'>DataCollective</a></h1>
            </div>
            <div className='user-interaction'>
                <button type='button' onClick={() => setLogInModal(true)}>log in</button>
                <button type='button'>new project</button>
                <button type='button'>new user</button>
            </div>
        </div>
    );
};

export default Header;