import React, { useState, useContext, useEffect } from 'react';
import { DataContext } from '../../../DataContext';
import axios from 'axios';
import { PostContext } from './PostContext';

function Post({post, admins}) {

    console.log(post)

    let dateOptions = {year: 'numeric', month: 'long', day: 'numeric'};

    const {thisUser, URL} = useContext(DataContext);
    const {pinPost, deletePost} = useContext(PostContext);

    const [editedPost, setEditedPost] = useState(post)
    const [editPost, setEditPost] = useState(false);

    const handleChange = (e) => {
        setEditedPost({...editedPost, [e.target.id]: e.target.value})
    }

    const handleEdit = () => {
        setEditPost(false)
        const url = `${URL}/posts/${post.id}`
        axios.put(url, editedPost)
            .then(res => console.log(res))
            .catch(console.error);
    }

    useEffect(() => {

    }, [editPost])

    return (
        <div className='Post'>
            {(post.pinned) && 
                <p>pinned</p>
            }
            {(admins.some(admin => admin === parseInt(thisUser.id))) &&
                <button type='button' onClick={() => pinPost(post)} >{(post.pinned) ? 'unpin post' : 'pin post'}</button>
            }
            {(admins.some(admin => admin === parseInt(thisUser.id)) || post.author === parseInt(thisUser.id)) &&
                <div>
                    <button type='button' onClick={() => setEditPost(true)} >edit post</button>
                    <button type='button' onClick={() => deletePost(post)} >delete post</button>
                </div>
            }
            {(editPost) && 
                <div>
                <input type='text' id='title' placeholder='title' onChange={handleChange} />
                <h6>posted by {post.username}</h6>
                <textarea id='body' placeholder='discuss here' onChange={handleChange} />
                <p>{new Date(post.date_posted).toDateString(undefined, dateOptions)}</p>
                <button type='button' onClick={handleEdit} >submit edit</button>
            </div>
            }
            {(!editPost) &&
                <div>
                    <h4>{post.title}</h4>
                    <h6>posted by {post.username}</h6>
                    <p>{post.body}</p>
                    <p>{new Date(post.date_posted).toDateString(undefined, dateOptions)}</p>
                </div>
            }
            
        </div>
    );
}

export default Post;