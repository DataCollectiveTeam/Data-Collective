import React, { useState } from 'react';
import './Modals.css'

function LogInModal({setLogInModal}) {

    const defaultLogIn = {username: '', password: ''}

    const [logInState, setLogInState] = useState(defaultLogIn);

    const handleChange = (e) => {
        setLogInState({...logInState, [e.target.id]: e.target.value})
    }

    const handleSubmit = () => {
        console.log(logInState)
    }

    return (
        <div className='modal-background'>
            <div className='modal-textbox'>
                <input type='text' id='username' placeholder='username' onChange={handleChange}/>
                <input type='text' id='password' placeholder='password' onChange={handleChange}/>
                <button type='button' onClick={handleSubmit} >log in</button>
                <button type='button' onClick={() => setLogInModal(false)} >close</button>
            </div>
        </div>
    );
}

export default LogInModal;