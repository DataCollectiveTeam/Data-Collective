import React, { useState, useContext, useEffect } from 'react';
import { DataContext } from '../../../DataContext';
import { PostContext } from './PostContext';
import axios from 'axios';

function Post({post, admins}) {


    let dateOptions = {year: 'numeric', month: 'long', day: 'numeric'};

    const {thisUser, URL} = useContext(DataContext);
    const {pinPost, deletePost, submitEdit} = useContext(PostContext);
    const [thisPost, setThisPost] = useState(null);
    const [editPost, setEditPost] = useState(false);

    const handleChange = (e) => {
        console.log(thisPost)
        setThisPost({...thisPost, [e.target.id]: e.target.value});
    }

    useEffect(() => {
        const url = `${URL}/posts/${post.id}`
        axios.get(url)
            .then(res => setThisPost(res.data))
            .catch(console.error);
    },[])

    if (thisPost) {
        return (
        <div className={`Post ${(post.pinned ? 'pinned' : null)}`}>
            {(post.pinned) && 
                <p>pinned</p>
            }
            <div className='post-buttons'>
               {(admins.some(admin => admin === parseInt(thisUser.id))) &&
                    <button className='pin-post-button' type='button' onClick={() => pinPost(thisPost)} >{(thisPost.pinned) ? 'unpin post' : 'pin post'}</button>
                }
                {(thisPost.author === parseInt(thisUser.id) && (editPost))
                ? <button className='edit-post-button' type='button' onClick={() => {submitEdit(thisPost); setEditPost(false)}} >save edit</button>
                : <button className='edit-post-button' type='button' onClick={() => setEditPost(true)} >edit post</button>
                }
                {(thisPost.author === parseInt(thisUser.id) || admins.some(admin => admin === parseInt(thisUser.id))) &&
                    <button className='delete-post-button' type='button' onClick={() => deletePost(thisPost)} >delete post</button> 
                } 
            </div>
            
            <div>
                {(editPost)
                ? <input className='post-title-input' type='text' id='title' value={thisPost.title} onChange={handleChange} />
                : <h4 className='post-title'>{thisPost.title}</h4>
                }
                
                <h6 className='post-info'>posted by <a className='post-author-link' href={`/citizens/${thisPost.author}`} >{thisPost.username}</a> on {new Date(thisPost.date_posted).toDateString(undefined, dateOptions)}</h6>
                <hr />
                {(editPost)
                ? <input className='post-body-input' type='text' id='body' value={thisPost.body} onChange={handleChange} /> 
                : <p className='post-body'>{thisPost.body}</p>
                }
                
            </div>
            
        </div>
    );
    } else {
        return (
            <div className='Post'>
                <p>loading post data...</p>
            </div>
        )
    }
    
}

export default Post;