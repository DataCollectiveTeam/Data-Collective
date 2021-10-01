import React, { useContext } from 'react';
import { PostContext } from './PostContext';

function ConfirmDelete({post, dateOptions, deletePost}) {

    const {setConfirmDelete} = useContext(PostContext);

    return (
        <div className='modal-background'>
            <div className='modal-textbox'>
                <div className='post-preview'>
                    <h4 className='post-title'>{post.title}</h4>
                    <h6 className='post-info' >posted by {post.username} on {new Date(post.date_posted).toDateString(undefined, dateOptions)}</h6>
                    <p className='post-body'>{post.body}</p>
                </div>
                <p>are you sure you want to delete this post?</p>
                <div>
                    <button className='yes-delete-button' type='button' onClick={() => deletePost(post)} >yes</button>
                    <button className='no-delete-button' type='button' onClick={() => setConfirmDelete(false)} >no</button> 
                </div>
                
            </div>
        </div>
    );
}

export default ConfirmDelete;