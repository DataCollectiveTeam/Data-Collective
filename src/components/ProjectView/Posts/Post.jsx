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
            <div className='post-buttons'>
               {(admins.some(admin => admin === parseInt(thisUser.id))) &&
                    <button className='pin-post-button' type='button' onClick={() => pinPost(thisPost)} >{(thisPost.pinned) ? 'unpin post' : 'pin post'}</button>
                }
                {(editPost)
                ? (thisPost.author === parseInt(thisUser.id)) ? <button className='edit-post-button' type='button' onClick={() => {submitEdit(thisPost); setEditPost(false)}} ><i class="far fa-check-circle"></i></button> : null
                : (thisPost.author === parseInt(thisUser.id)) ? <button className='edit-post-button' type='button' onClick={() => setEditPost(true)} ><i class="fas fa-edit"></i></button> : null
                }
                {(thisPost.author === parseInt(thisUser.id) || admins.some(admin => admin === parseInt(thisUser.id))) &&
                    <button className='delete-post-button' type='button' onClick={() => deletePost(thisPost)} ><i class="fas fa-trash"></i></button> 
                } 
            </div>
            
            <div>
                {(editPost)
                ? <input className='post-title-input' type='text' id='title' value={thisPost.title} onChange={handleChange} />
                : <h4 className='post-title'>{(post.pinned) ? <span className='pin'><i class="fas fa-thumbtack"></i></span> : null}{thisPost.title}</h4>
                }
                
                <h6 className='post-info'>posted by <a className='post-author-link' href={`/citizens/${thisPost.author}`} >{thisPost.username}</a> on {new Date(thisPost.date_posted).toDateString(undefined, dateOptions)}</h6>
                <hr />
                {(editPost)
                ? <textarea className='post-body-input' rows='5' id='body' value={thisPost.body} onChange={handleChange} /> 
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