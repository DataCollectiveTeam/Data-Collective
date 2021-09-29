import React from 'react';
import Post from './Post';

function PinnedPosts({posts, admins, editPost, setEditPost}) {

    posts.sort((a, b) => {
        return a.id - b.id;
    })

    return (
        <div className='PinnedPosts'>
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

export default PinnedPosts;