import React, { useContext, useState } from 'react';
import './Modals.css'
import axios from 'axios';
import { DataContext } from '../../DataContext';

function LogInModal({setLogInModal}) {

    const {thisUser, setThisUser } = useContext(DataContext);

    const defaultLogIn = {username: '', password: ''}

    const [logInState, setLogInState] = useState(defaultLogIn);

    const handleChange = (e) => {
        setLogInState({...logInState, [e.target.id]: e.target.value})
    }

    const handleSubmit = () => {
        console.log(logInState)
        const url = `http://localhost:8000/citizens/login/${logInState.username}`;
        axios.get(url)
            .then(res => setThisUser(res.data[0]))
            .catch(console.error);
        
        console.log(thisUser)
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