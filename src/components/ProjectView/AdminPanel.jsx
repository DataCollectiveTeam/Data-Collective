import React, { useContext, useState } from 'react';
import EditProjectModal from '../Modals/EditProjectModal';
import axios from 'axios';

const AdminPanel = ({p}) => {

    const [showEditModal, setShowEditModal] = useState(false);
    
    const editProject = () => {
        setShowEditModal(true);
    }

    const deleteProject = () => {
        const url = `http://localhost:8000/`
        axios.delete(`${url}projects/${p.id}`)
        .then(res => console.log(res))
        .catch(console.error);
    }

    return (
        <div>
            {showEditModal &&
                <EditProjectModal p={p} setShowEditModal={setShowEditModal}/>
            }
            <div className='project-admin-buttons'>
                    <button className='edit-project-button' type='button' onClick={editProject} ><span className='far fa-edit'>Edit</span></button>
                    <button className='delete-project-button' type='button' onClick={deleteProject} ><span className='far fa-trash-alt'>Delete</span></button>
            </div>
        </div>
    );
};

export default AdminPanel;