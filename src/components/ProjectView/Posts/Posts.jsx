import React from 'react';
import Post from './Post';

function Posts({posts, admins}) {

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
                        />
            })}
        </div>
    );
}

export default Posts;