import axios from 'axios';
import React, { useContext, useState } from 'react';
import { DataContext } from '../../../DataContext';

function NewPost({project, setShowNewPostModal, posted, setPosted}) {

    console.log(project)

    const { thisUser, URL } = useContext(DataContext);

    const defaultNewPost = {
        project: project.id,
        author: parseInt(thisUser.id),
        username: thisUser.name,
        title: '',
        body: '',
        pinned: false,
        date_posted: new Date() 
    }

    const [newPost, setNewPost] = useState(defaultNewPost);

    const handleChange = (e) => {
        setNewPost({...newPost, [e.target.id]: e.target.value})
    }

    const handleSubmit = () => {
        console.log(newPost)
        const url = `${URL}/posts/`
        axios.post(url, newPost)
            .then(res => setPosted(!posted))
            .catch(console.error);
        setShowNewPostModal(false);
    }

    return (
        <div className='modal-background'>
            <div className='modal-textbox'>
               <input type='text' id='title' placeholder='title' value={newPost.title} onChange={handleChange} />
                <textarea id='body' placeholder='discuss here' value={newPost.body} onChange={handleChange} />
                <button type='button' onClick={handleSubmit} >post</button> 
                <button type='button' onClick={() => setShowNewPostModal(false)} >cancel</button>
            </div>
        </div>
    );
}

export default NewPost;