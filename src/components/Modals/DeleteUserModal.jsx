import React from 'react';
import './Modals.css'
import axios from 'axios';

const DeleteUserModal = ({user, setDeleteUserModal}) => {
    
    const deleteUser = () => {
        const url = `http://localhost:8000`
        axios.delete(`${url}/citizens/${user.id}`)
    }

    return (
        <div>
            <h2>This action is permanent.</h2>
            <h2>Are you sure you want to delete your account?</h2>
            <button className='delete-button' type='button' onClick={deleteUser} >delete citizen</button>
            <button type='button' onClick={() => setDeleteUserModal(false)} >cancel</button>
        </div>
    );
};

export default DeleteUserModal;