import React, { useContext, useState } from 'react';
import './Modals.css'
import axios from 'axios';
import { DataContext } from '../../DataContext';

const EditUserModal = ({user, setEditUserModal}) => {

    const { setThisUser } = useContext(DataContext);

    const defaultUserInfo= {
        name: user.name,
        password: user.password,
        img: user.img,
        bio: user.bio
    }

    const [editedUser, setEditedUser] = useState(defaultUserInfo)
    const [deleteButton, setDeleteButton] = useState(false)

    const handleChange = (e) => {
        setEditedUser({...editedUser, [e.target.id]: e.target.value})
    }

    const handleSubmit = () => {
        const url = `http://localhost:8000`
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

    const deleteUser = () => {
        const url = `http://localhost:8000`
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