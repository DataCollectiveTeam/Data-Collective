import React, { useContext, useState } from 'react';
import axios from 'axios';
import { DataContext } from '../../DataContext';

const EditProjectModal = ({p, setShowEditModal}) => {

    const { thisUser } = useContext(DataContext);

    const defaultEditedProject = {
        name: p.name,
        header: p.header,
        img: p.img,
        description: p.description
    }

    const [editedProject, setEditedProject] = useState(defaultEditedProject);

    const handleChange = (e) => {
        console.log(thisUser)
        setEditedProject({...editedProject, [e.target.id]: e.target.value})
    }

    const handleSubmit = () => {
        let editedProjectObj = {
            ...editedProject,
            creator: thisUser.id,
            admin_list: [thisUser.id],
            contributor_list: [thisUser.id]
        }

        const url = 'http://localhost:8000/'
        axios.put(`${url}projects/${p.id}`, editedProjectObj)
            .then(res => console.log(res))
            .catch(console.error);
    }

    return (
        <div className='modal-background'>
            <div className='modal-textbox'>
                <input type='text' id='name' placeholder='project name' value={editedProject.name} onChange={handleChange} />
                <input type='text' id='header' placeholder='quick explanation of your project' value={editedProject.header} onChange={handleChange} />
                <input type='text' id='img' placeholder='image url for your project' value={editedProject.img} onChange={handleChange} />
                <textarea id='description' placeholder='detailed explanation of your project' value={editedProject.description} onChange={handleChange} />
                <button type='button' onClick={handleSubmit} >submit changes</button>
                <button type='button' onClick={() => setShowEditModal(false)} >close</button>
            </div>
        </div>
    );
};

export default EditProjectModal;