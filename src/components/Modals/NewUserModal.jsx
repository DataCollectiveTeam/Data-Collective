import React, { useContext, useState } from 'react';
import './Modals.css'
import axios from 'axios';
import { DataContext } from '../../DataContext';

const NewUserModal = ({setNewUserModal}) => {

    const { setThisUser } = useContext(DataContext);

    const defaultForm = {
        name: '',
        password: '',
        confirmPassword: '',
        img: '',
        bio: ''
    }

    const defaultErrorState = {passwordMismatch: false, duplicateUser:false}

    const [formState, setFormState] = useState(defaultForm)
    const [errorState, setErrorState] = useState(defaultErrorState)

    const handleChange = (e) => {
        setFormState({...formState, [e.target.id]: e.target.value})
    }

    const handleSubmit = () => {
        console.log(formState)
        if (formState.password !== formState.confirmPassword){
            setFormState(defaultForm)
            setErrorState({passwordMismatch: true})
        } else {
            let newUserObj ={
                ...formState,
                account_created: new Date()
            }
            const url = `http://localhost:8000/citizens/`
            axios.post(url, newUserObj)
            .then(res => {
                if (res.data){
                    //if login succeeeds, set user state and localStorage user
                    setThisUser({name: res.data.name, id: res.data.id})
                    localStorage.setItem('name', res.data.name)
                    localStorage.setItem('id', res.data.id)
                    setNewUserModal(false)
                }
                else{
                    //if login attempt fails, show error state
                    setFormState(defaultForm)
                    setErrorState({duplicateUser:true})
                }
            })
        }
    }

    return (
        <div className='modal-background'>
            <div className='modal-textbox'>
                <input type='text' id='name' placeholder='username' value={formState.name} onChange={handleChange}/>
                <input type='text' id='password' placeholder='password' value={formState.password} onChange={handleChange}/>
                <input type='text' id='confirmPassword' placeholder='confirm password' value={formState.confirmPassword} onChange={handleChange}/>
                <input type='text' id='img' placeholder='image url' value={formState.img} onChange={handleChange}/>
                <input type='text' id='bio' placeholder='brief bio' value={formState.bio} onChange={handleChange}/>
                {errorState.passwordMismatch ? <p>passwords must match</p>: null}
                {errorState.duplicateUser ? <p>username taken</p>: null}
                <button type='button' onClick={handleSubmit} >create account</button>
                <button type='button' onClick={() => setNewUserModal(false)} >close</button>
            </div>
        </div>
    );
};

export default NewUserModal;