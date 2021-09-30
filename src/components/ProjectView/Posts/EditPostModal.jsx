import React, {useContext, useState} from 'react';
import axios from 'axios';
import { DataContext } from '../../../DataContext';

function EditPostModal({post, setEditPost}) {

    console.log(post)

    const {URL} = useContext(DataContext);

    const [editedPost, setEditedPost] = useState(post)

    const handleChange = (e) => {
        setEditedPost({...editedPost, [e.target.id]: e.target.value})
    }

    const handleEdit = () => {
        const url = `${URL}/posts/${post.id}`
        axios.put(url, editedPost)
            .then(res => setEditPost(false))
            .catch(console.error);
        
    }

    return (
        <div className='modal-background'>
            <div className='modal-textbox'>
                <input type='text' id='title' placeholder='title' value={editedPost.title} onChange={handleChange} />
                <textarea id='body' placeholder='discuss here' value={editedPost.body} onChange={handleChange} />
                <button type='button' onClick={handleEdit} >submit edit</button>
                <button type='button' onClick={() => setEditPost(false)} >cancel</button>
            </div>
        </div>
    );
}

export default EditPostModal;