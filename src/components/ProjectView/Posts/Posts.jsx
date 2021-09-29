import React, { useContext, useEffect } from 'react';
import { DataContext } from '../../../DataContext';
import Post from './Post';

function Posts({posts, admins}) {

    const {thisUser} = useContext(DataContext);

    posts.sort((a, b) => {
        return a.id - b.id;
    })

    return (
        <div className='Posts'>
            {posts.map(post => {
                return <Post post={post} admins={admins}/>
            })}
        </div>
    );
}

export default Posts;