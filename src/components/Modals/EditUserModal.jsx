import React, { useContext, useState } from 'react';
import './Modals.css'
import axios from 'axios';
import { DataContext } from '../../DataContext';
import { Redirect } from 'react-router-dom';

const EditUserModal = ({user, setEditUserModal}) => {
    
    //get function to update current user from DataContext
    const { thisUser, setIsLoggedIn, setThisUser, URL } = useContext(DataContext);
    
    //pull current user info to set as initial state
    const defaultUserInfo= {
        name: user.name,
        password: user.password,
        img: user.img,
        bio: user.bio
    }
    
    //store user info in state and allow toggle of delete button in state
    const [editedUser, setEditedUser] = useState(defaultUserInfo)
    const [deleteButton, setDeleteButton] = useState(false);
    const [userDeleted, setUserDeleted] = useState(false);

    //match input id to property of editedUser object and update
    const handleChange = (e) => {
        setEditedUser({...editedUser, [e.target.id]: e.target.value})
    }

    //put changes to databases and udate localStorage items
    const handleSubmit = () => {
        setEditUserModal(false);
        const url = URL;
        axios.put(`${url}/citizens/${user.id}`, editedUser)
        .then(res => {
            //if login succeeeds, set user state and localStorage user
            setThisUser({name: res.data.name, id: res.data.id, img: res.data.img})
            localStorage.setItem('name', res.data.name)
            localStorage.setItem('id', res.data.id)
            localStorage.setItem('img', res.data.img)
            setEditUserModal(false)
        })
    }

    //delete user from database
    const deleteUser = () => {
        const deletedUser = {
            bio: 'this user has deleted their account',
            img: 'https://www.drnitinborse.com/wp-content/uploads/2018/02/user-icon-300x300.png',
            name: 'deleted',
            password: 'JJNFSNOS78432879yfdsnj7KBJBKOBas789'
        }
        const url = URL;
        axios.put(`${url}/citizens/${user.id}`, deletedUser)
            .then(res => {
                localStorage.clear();
                setIsLoggedIn(false);
                setUserDeleted(true)
            })
            .catch(console.error);
    }
    
    return (
        <div className='modal-background'>
            <div className='modal-textbox'>
                {(userDeleted) &&
                    <Redirect to='/projects' />
                }
                <input className='edit-user-input' type='text' id='name' placeholder='username' value={editedUser.name} onChange={handleChange}/>
                <input className='edit-user-input' type='text' id='img' placeholder='image url' value={editedUser.img} onChange={handleChange}/>
                <input className='edit-user-input' type='text' id='bio' placeholder='brief bio' value={editedUser.bio} onChange={handleChange}/>
                <div className="delete-user-panel">
                    { deleteButton ? <button className='delete-user-button' type='button' onClick={deleteUser} >permanently delete</button> : <button className='delete-citizen' type='button' onClick={() => setDeleteButton(true)}>delete account</button>}
                    { deleteButton ? <button className='close-modal-button' type='button' onClick={() => setDeleteButton(false)} ><i class="fas fa-ban"></i></button> : null}
                </div>
                <div>
                    <button className='submit-edit-user' type='button' onClick={handleSubmit} ><i class="fas fa-check"></i></button>
                    <button className='close-modal-button' type='button' onClick={() => setEditUserModal(false)} ><i class="fas fa-times"></i></button> 
                </div>
            </div>
        </div>
    );
};

export default EditUserModal;