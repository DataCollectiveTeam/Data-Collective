import React, { useContext, useState } from 'react';
import './Modals.css'
import axios from 'axios';
import { DataContext } from '../../DataContext';

const EditUserModal = ({user, setEditUserModal}) => {
    
    //get function to update current user from DataContext
    const { setThisUser, URL } = useContext(DataContext);
    
    //pull current user info to set as initial state
    const defaultUserInfo= {
        name: user.name,
        password: user.password,
        img: user.img,
        bio: user.bio
    }
    
    //store user info in state and allow toggle of delete button in state
    const [editedUser, setEditedUser] = useState(defaultUserInfo)
    const [deleteButton, setDeleteButton] = useState(false)

    //match input id to property of editedUser object and update
    const handleChange = (e) => {
        setEditedUser({...editedUser, [e.target.id]: e.target.value})
    }

    //put changes to databases and udate localStorage items
    const handleSubmit = () => {
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
        const url = URL;
        axios.delete(`${url}/citizens/${user.id}`)
    }
    
    return (
        <div className='modal-background'>
            <div className='modal-textbox'>
                <input type='text' id='name' placeholder='username' value={editedUser.name} onChange={handleChange}/>
                <input type='text' id='img' placeholder='image url' value={editedUser.img} onChange={handleChange}/>
                <input type='text' id='bio' placeholder='brief bio' value={editedUser.bio} onChange={handleChange}/>
                <button type='button' onClick={handleSubmit} >submit</button>
                <button type='button' onClick={() => setEditUserModal(false)} >close</button>
                <div className="delete-user-panel">
                    { deleteButton ? <button className='delete-button' type='button' onClick={deleteUser} >permanently delete</button> : <button type='button' onClick={() => setDeleteButton(true)}>delete citizen</button>}
                    { deleteButton ? <button type='button' onClick={() => setDeleteButton(false)} >cancel</button> : null}
                </div>
            </div>
        </div>
    );
};

export default EditUserModal;