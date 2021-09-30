import React, { useState, useContext, useEffect } from 'react';
import { DataContext } from '../../../DataContext';
import { PostContext } from './PostContext';
import EditPostModal from './EditPostModal';
import ConfirmDelete from './ConfirmDelete';

function Post({post, admins, editPost, setEditPost}) {

    console.log(post)

    let dateOptions = {year: 'numeric', month: 'long', day: 'numeric'};

    const {thisUser} = useContext(DataContext);
    const {pinPost, deletePost, confirmDelete, setConfirmDelete} = useContext(PostContext);

    return (
        <div className={`Post ${(post.pinned ? 'pinned' : null)}`}>
            {(confirmDelete) &&
                <ConfirmDelete post={post} dateOptions={dateOptions} deletePost={deletePost}/>
            }
            {(editPost) &&
                <EditPostModal post={post} setEditPost={setEditPost} />
            }
            {(post.pinned) && 
                <p>pinned</p>
            }
            <div className='post-buttons'>
               {(admins.some(admin => admin === parseInt(thisUser.id))) &&
                    <button className='pin-post-button' type='button' onClick={() => pinPost(post)} >{(post.pinned) ? 'unpin post' : 'pin post'}</button>
                }
                {(post.author === parseInt(thisUser.id)) &&
                    <button className='edit-post-button' type='button' onClick={() => setEditPost(true)} >edit post</button>
                }
                {(post.author === parseInt(thisUser.id) || admins.some(admin => admin === parseInt(thisUser.id))) &&
                    <button className='delete-post-button' type='button' onClick={() => setConfirmDelete(true)} >delete post</button> 
                } 
            </div>
            
            <div>
                <h4 className='post-title'>{post.title}</h4>
                <h6 className='post-info'>posted by {post.username} on {new Date(post.date_posted).toDateString(undefined, dateOptions)}</h6>
                <hr />
                <p className='post-body'>{post.body}</p>
            </div>
            
        </div>
    );
}

export default Post;