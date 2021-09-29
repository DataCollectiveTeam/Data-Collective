import axios from 'axios';
import React, { useContext, useState } from 'react';
import { DataContext } from '../../../DataContext';

function NewPost({project}) {

    const { thisUser, URL } = useContext(DataContext);

    const defaultNewPost = {
        project: project,
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
        const url = `${URL}/posts/`
        axios.post(url, newPost)
            .then(res => console.log(res))
            .catch(console.error);
    }

    return (
        <div className='NewPost'>
            <input type='text' id='title' placeholder='title' onChange={handleChange} />
            <textarea id='body' placeholder='discuss here' onChange={handleChange} />
            <button type='button' onClick={handleSubmit} >post</button>
        </div>
    );
}

export default NewPost;