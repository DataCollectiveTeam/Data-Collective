import React, { useContext, useState } from 'react';
import './Modals.css'
import axios from 'axios';
import { DataContext } from '../../DataContext';

function LogInModal({setLogInModal}) {

    const { setThisUser } = useContext(DataContext);

    const defaultForm = {username: '', password: ''}

    const [formState, setFormState] = useState(defaultForm)
    const [errorState, setErrorState] = useState(false)

    const handleChange = (e) => {
        setFormState({...formState, [e.target.id]: e.target.value})
    }

    const handleSubmit = () => {
        const url = `http://localhost:8000/citizens/login/${formState.username}`

        axios.get(url)
            .then(res => {
                if (res.data[0]){
                    //if login succeeeds, set user state and localStorage user
                    setThisUser({name: res.data[0].name, id: res.data[0].id})
                    localStorage.setItem('name', res.data[0].name)
                    localStorage.setItem('id', res.data[0].id)
                    setLogInModal(false)
                }
                else{
                    //if login attempt fails, show error state
                    setFormState(defaultForm)
                    setErrorState(true)
                }
            })
    }

    return (
        <div className='modal-background'>
            <div className='modal-textbox'>
                <input type='text' id='username' placeholder='username' value={formState.username} onChange={handleChange}/>
                <input type='text' id='password' placeholder='password' value={formState.password} onChange={handleChange}/>
                {errorState ? <p>login failed</p>: null}
                <button type='button' onClick={handleSubmit} >log in</button>
                <button type='button' onClick={() => setLogInModal(false)} >close</button>
            </div>
        </div>
    );
}

export default LogInModal;