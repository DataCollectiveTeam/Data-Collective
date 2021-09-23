import React, { useState } from 'react';
import axios from 'axios';

function NewProjectModal({setNewProjectModal}) {

    const defaultNewProject = {
        name: '',
        header: '',
        img: '',
        description: ''
    }

    const [newProject, setNewProject] = useState(defaultNewProject);

    const handleChange = (e) => {
        setNewProject({...newProject, [e.target.id]: e.target.value})
    }

    const handleSubmit = () => {
        console.log(newProject)
    }

    return (
        <div className='modal-background'>
            <div className='modal-textbox'>
                <input type='text' id='name' placeholder='project name' onChange={handleChange} />
                <input type='text' id='header' placeholder='quick explanation of your project' onChange={handleChange} />
                <input type='text' id='img' placeholder='image url for your project' onChange={handleChange} />
                <textarea id='description' placeholder='detailed explanation of your project' onChange={handleChange} />
                <button type='button' onClick={handleSubmit} >start collecting</button>
                <button type='button' onClick={() => setNewProjectModal(false)} >close</button>
            </div>
        </div>
    );
}

export default NewProjectModal;