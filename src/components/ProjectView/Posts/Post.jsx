import React, { useState, useContext, useEffect } from 'react';
import { DataContext } from '../../../DataContext';
import axios from 'axios';
import { PostContext } from './PostContext';
import EditPostModal from './EditPostModal';

function Post({post, admins, editPost, setEditPost}) {

    console.log(post)

    let dateOptions = {year: 'numeric', month: 'long', day: 'numeric'};

    const {thisUser} = useContext(DataContext);
    const {pinPost, deletePost} = useContext(PostContext);

    return (
        <div className='Post'>
            {(editPost) &&
                <EditPostModal post={post} setEditPost={setEditPost} />
            }
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
            <div>
                <h4>{post.title}</h4>
                <h6>posted by {post.username}</h6>
                <p>{post.body}</p>
                <p>{new Date(post.date_posted).toDateString(undefined, dateOptions)}</p>
            </div>
            
        </div>
    );
}

export default Post;