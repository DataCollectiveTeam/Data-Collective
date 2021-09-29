import React, { useContext, useEffect, useState } from 'react';
import NewPost from './Posts/NewPost';
import PinnedPosts from './Posts/PinnedPosts';
import Posts from './Posts/Posts';
import axios from 'axios';
import { DataContext } from '../../DataContext';

function Discussion({project, admins}) {

    const {URL} = useContext(DataContext);

    const [posts, setPosts] = useState(null);
    const [pinnedPosts, setPinnedPosts] = useState(null);

    useEffect(() => {
        const url = `${URL}/project_posts/${project}`
        const url2 = `${URL}/pinned_posts/${project}`
        axios.all([
            axios.get(url),
            axios.get(url2)
        ])
        .then(axios.spread((res1, res2) => {
            console.log(res1.data)
            setPosts(res1.data);
            console.log(res2.data)
            setPinnedPosts(res2.data);
        } )) 
        .catch(console.error);   
    }, [])


    return (
        <div className='Discussion'>
            <NewPost project={project} />
            {(pinnedPosts) &&
                <PinnedPosts admins={admins} posts={pinnedPosts}/>
            }
            {(posts) &&
                <Posts admins={admins} posts={posts}/>
            }
            
        </div>
    );
}

export default Discussion;