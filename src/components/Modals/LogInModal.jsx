import React, { useContext, useState } from 'react';
import './Modals.css'
import axios from 'axios';
import { DataContext } from '../../DataContext';

function LogInModal({setLogInModal}) {

    //get function to update current user from DataContext
    const { setThisUser } = useContext(DataContext);

    //default the form state to empty strings
    const defaultForm = {name: '', password: ''}

    //store form and error status in state
    const [formState, setFormState] = useState(defaultForm)
    const [errorState, setErrorState] = useState(false)

    //match input id to property of editedUser object and update
    const handleChange = (e) => {
        setFormState({...formState, [e.target.id]: e.target.value})
    }

    //get citizen by username and password
    const handleSubmit = () => {
        const url = `http://localhost:8000/citizens/login/${formState.name}&${formState.password}`
        axios.get(url)
            .then(res => {
                if (res.data[0]){
                    //if login succeeeds, set user state and localStorage user
                    setThisUser({name: res.data.name, id: res.data[0].id})
                    localStorage.setItem('name', res.data[0].name)
                    localStorage.setItem('id', res.data[0].id)
                    localStorage.setItem('img', res.data[0].img)
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
                <input type='text' id='name' placeholder='name' value={formState.name} onChange={handleChange}/>
                <input type='text' id='password' placeholder='password' value={formState.password} onChange={handleChange}/>
                {errorState ? <p>login failed</p>: null}
                <button type='button' onClick={handleSubmit} >log in</button>
                <button type='button' onClick={() => setLogInModal(false)} >close</button>
            </div>
        </div>
    );
}

export default LogInModal;