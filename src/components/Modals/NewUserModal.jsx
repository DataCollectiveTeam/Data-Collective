import React, { useContext, useState } from 'react';
import './Modals.css'
import axios from 'axios';
import { DataContext } from '../../DataContext';

const NewUserModal = ({setNewUserModal}) => {

    //get function to update current user from DataContext
    const { setThisUser, URL } = useContext(DataContext);

    //default the form state to empty strings
    const defaultForm = {
        name: '',
        password: '',
        confirmPassword: '',
        img: '',
        bio: ''
    }
    
    //default the error state to false for both errors
    const defaultErrorState = {passwordMismatch: false, duplicateUser:false}

    //store form and error status in state
    const [formState, setFormState] = useState(defaultForm)
    const [errorState, setErrorState] = useState(defaultErrorState)

    //match input id to property of editedUser object and update
    const handleChange = (e) => {
        setFormState({...formState, [e.target.id]: e.target.value})
    }

    //if passwords match, post new citizen to database
    const handleSubmit = () => {
        if (formState.password !== formState.confirmPassword){
            setFormState(defaultForm)
            setErrorState({passwordMismatch: true})
        } else {
            let newUserObj ={
                ...formState,
                account_created: new Date()
            }
            if (newUserObj.img === '') {
                newUserObj.img = 'https://www.drnitinborse.com/wp-content/uploads/2018/02/user-icon-300x300.png'
            }
            const url = `${URL}/citizens/`
            axios.post(url, newUserObj)
            .then(res => {
                if (res.data){
                    //if login succeeeds, set user state and localStorage user
                    setThisUser({name: res.data.name, id: res.data.id})
                    localStorage.setItem('name', res.data.name)
                    localStorage.setItem('id', res.data.id)
                    localStorage.setItem('img', res.data.img)
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
                <input className='username-input' type='text' id='name' placeholder='username' value={formState.name} onChange={handleChange}/>
                <input className='password-input' type='password' id='password' placeholder='password' value={formState.password} onChange={handleChange}/>
                <input className='password-input' type='password' id='confirmPassword' placeholder='confirm password' value={formState.confirmPassword} onChange={handleChange}/>
                <input className='img-url-input' type='text' id='img' placeholder='image url' value={formState.img} onChange={handleChange}/>
                <input className='bio-input' type='text' id='bio' placeholder='brief bio' value={formState.bio} onChange={handleChange}/>
                {errorState.passwordMismatch ? <p className='login-failed'>passwords must match</p>: null}
                {errorState.duplicateUser ? <p className='login-failed'>username taken</p>: null}
                <div>
                    <button className='create-account-button' type='button' onClick={handleSubmit} ><i class="fas fa-user-plus"></i></button>
                    <button className='close-modal-button' type='button' onClick={() => setNewUserModal(false)} ><i class="fas fa-times"></i></button>
                </div>
                
                
            </div>
        </div>
    );
};

export default NewUserModal;