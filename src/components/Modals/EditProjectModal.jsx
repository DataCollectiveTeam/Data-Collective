import React, { useContext, useState } from 'react';
import axios from 'axios';
import { DataContext } from '../../DataContext';

const EditProjectModal = ({p, setShowEditModal, projectReload, setProjectReload}) => {
    
    //get current user from DataContext
    const { thisUser, URL } = useContext(DataContext);

    const defaultEditedProject = {
        name: p.name,
        header: p.header,
        img: p.img,
        description: p.description
    }

    const [editedProject, setEditedProject] = useState(defaultEditedProject);

    const handleChange = (e) => {
        setEditedProject({...editedProject, [e.target.id]: e.target.value})
    }

    const handleSubmit = () => {
        
        let editedProjectObj = {
            ...editedProject,
            creator: thisUser.id,
            admin_list: [thisUser.id],
            contributor_list: [thisUser.id]
        }
        
        const url = URL;
        axios.put(`${url}/projects/${p.id}`, editedProjectObj)
            .then(res => {
                setProjectReload(!projectReload)
                setShowEditModal(false)
            })
            .catch(console.error);
    }

    return (
        <div className='modal-background'>
            <div className='modal-textbox'>
                <input className='project-name-input' type='text' id='name' placeholder='project name' value={editedProject.name} onChange={handleChange} />
                <input className='heading-input' type='text' id='header' placeholder='quick explanation of your project' value={editedProject.header} onChange={handleChange} />
                <input className='img-url-input' type='text' id='img' placeholder='image url for your project' value={editedProject.img} onChange={handleChange} />
                <textarea className='explaination-input' id='description' rows='5' placeholder='detailed explanation of your project' value={editedProject.description} onChange={handleChange} />
                <div>
                    <button className='submit-project-button' type='button' onClick={handleSubmit} ><i class="fas fa-check"></i></button>
                    <button className='close-modal-button' type='button' onClick={() => setShowEditModal(false)} ><i class="fas fa-times"></i></button> 
                </div>
                
            </div>
        </div>
    );
};

export default EditProjectModal;