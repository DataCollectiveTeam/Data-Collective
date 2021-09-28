import React, { useContext, useState } from 'react';
import axios from 'axios';
import { DataContext } from '../../DataContext';

function NewProjectModal({setNewProjectModal}) {

    const { thisUser, URL } = useContext(DataContext);

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
        let newProjectObj = {
            ...newProject,
            creator: thisUser.id,
            admin_list: [thisUser.id],
            contributor_list: [thisUser.id]
        }

        const url = `${URL}/projects/`
        axios.post(url, newProjectObj)
            .then(res => console.log(res))
            .catch(console.error);
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