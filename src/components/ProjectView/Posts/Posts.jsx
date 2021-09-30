import React, { useContext, useEffect } from 'react';
import { DataContext } from '../../../DataContext';
import Post from './Post';

function Posts({posts, admins, editPost, setEditPost}) {

    const {thisUser} = useContext(DataContext);

    posts.sort((a, b) => {
        return a.id - b.id;
    })

    return (
        <div className='Posts'>
            {posts.map(post => {
                return <Post 
                            key={post.id}
                            post={post} 
                            admins={admins}
                            editPost={editPost}
                            setEditPost={setEditPost}
                        />
            })}
        </div>
    );
}

export default Posts;