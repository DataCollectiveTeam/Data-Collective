import React, { useContext } from 'react';
import { PostContext } from './PostContext';

function ConfirmDelete({post, dateOptions, deletePost}) {

    const {setConfirmDelete} = useContext(PostContext);

    return (
        <div className='modal-background'>
            <div className='modal-textbox'>
                <div>
                    <h4>{post.title}</h4>
                    <h6>posted by {post.username}</h6>
                    <p>{post.body}</p>
                    <p>{new Date(post.date_posted).toDateString(undefined, dateOptions)}</p>
                </div>
                <p>are you sure you want to delete this post?</p>
                <button type='button' onClick={() => deletePost(post)} >yes</button>
                <button type='button' onClick={() => setConfirmDelete(false)} >no</button>
            </div>
        </div>
    );
}

export default ConfirmDelete;