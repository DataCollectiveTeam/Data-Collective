import React, { useContext } from 'react';
import { DataContext } from '../../../DataContext';

function Post({post, admins}) {

    console.log(post)

    let dateOptions = {year: 'numeric', month: 'long', day: 'numeric'};

    const {thisUser, URL} = useContext(DataContext);

    const pinPost = () => {
        console.log(post.id)
    }

    return (
        <div className='Post'>
            {(admins.some(admin => admin === parseInt(thisUser.id))) &&
                <button type='button' onClick={pinPost} >pin post</button>
            }
            <h4>{post.title}</h4>
            <p>{post.body}</p>
            <p>{new Date(post.date_posted).toDateString(undefined, dateOptions)}</p>
        </div>
    );
}

export default Post;