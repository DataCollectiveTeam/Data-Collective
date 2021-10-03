import React, { useContext, useState } from 'react';
import axios from 'axios';
import { DataContext } from '../../DataContext';
import { Redirect } from 'react-router';

function NewProjectModal({setNewProjectModal}) {

    const { thisUser, URL } = useContext(DataContext);

    const defaultNewProject = {
        name: '',
        header: '',
        img: '',
        description: ''
    }

    const [newProject, setNewProject] = useState(defaultNewProject);
    const [redirectId, setRedirectId] = useState(null);
    const [response, setResponse] = useState(false);

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
            .then(res => {
                setRedirectId(res.data.id);
                setResponse(true);
                setNewProjectModal(false);
            })
            .catch(console.error);
    }

    return (
        <div className='modal-background'>
            <div className='modal-textbox'>
                {(response && redirectId) &&
                    <Redirect to={`/projects/${redirectId}`} />
                }
                <input className='project-name-input' type='text' id='name' placeholder='project name' onChange={handleChange} />
                <input className='heading-input' type='text' id='header' placeholder='quick explanation of your project' onChange={handleChange} />
                <input className='img-url-input' type='text' id='img' placeholder='image url for your project' onChange={handleChange} />
                <textarea className='explaination-input' id='description' rows='5' placeholder='detailed explanation of your project' onChange={handleChange} />
                <div>
                    <button className='submit-project-button' type='button' onClick={handleSubmit} ><i class="fas fa-check"></i></button>
                    <button className='close-modal-button' type='button' onClick={() => setNewProjectModal(false)} ><i class="fas fa-times"></i></button> 
                </div>
                
                
            </div>
        </div>
    );
}

export default NewProjectModal;