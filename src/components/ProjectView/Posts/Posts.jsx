import React, { useContext, useEffect } from 'react';
import { DataContext } from '../../../DataContext';
import Post from './Post';

function Posts({posts, admins}) {

    console.log(posts);

    const {thisUser} = useContext(DataContext);

    return (
        <div className='Posts'>
            {posts.map(post => {
                return <Post post={post} admins={admins}/>
            })}
        </div>
    );
}

export default Posts;