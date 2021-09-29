import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router';
import { DataContext } from '../../DataContext';
import axios from 'axios';

function DeleteProjectModal({p, setDeleteProjectModal}) {

    const { URL } = useContext(DataContext);
    const [isDeleted, setIsDeleted] = useState(false);

    const deleteProject = () => {
        const url = URL;
        axios.delete(`${url}/projects/${p.id}`)
        .then(res => {
            setIsDeleted(true);
        })
        .catch(console.error);
    }

    return (
        <div className='modal-background'>
            <div className='modal-textbox'>
                {isDeleted &&
                    <Redirect to='/' />
                }
                <p>are you sure you want to delete this project?</p>
                <h2>{p.name}</h2>
                <p>this will delete all data related to this project</p>
                <p>you CAN NOT undo this action</p>
                <div>
                    <button type='button' onClick={() => setDeleteProjectModal(false)} >no, go back</button>
                    <button type='button' onClick={deleteProject}>yes, I'm sure</button>
                </div>

            </div>
        </div>
    );
}

export default DeleteProjectModal;