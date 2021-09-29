import React, { useContext, useEffect, useState } from 'react';
import NewPost from './Posts/NewPost';
import PinnedPosts from './Posts/PinnedPosts';
import Posts from './Posts/Posts';
import axios from 'axios';
import { DataContext } from '../../DataContext';
import { PostContext } from './Posts/PostContext';

function Discussion({project, admins}) {

    const {URL} = useContext(DataContext);

    const [posts, setPosts] = useState(null);
    const [pinnedPosts, setPinnedPosts] = useState(null);

    const pinPost = (thisPost) => {
        console.log('PINNING', thisPost)
        let postToPin = thisPost;
        postToPin.pinned = !postToPin.pinned;
        const url = `${URL}/posts/${thisPost.id}`
        axios.put(url, postToPin)
            .then(res => console.log(res))
            .catch(console.error);
    }

    const deletePost = (thisPost) => {
        const url = `${URL}/posts/${thisPost.id}`
        axios.delete(url)
            .then(res => {console.log(res)})
            .catch(console.error);
    }

    useEffect(() => {
        const url = `${URL}/project_posts/${project}`
        const url2 = `${URL}/pinned_posts/${project}`
        axios.all([
            axios.get(url),
            axios.get(url2)
        ])
        .then(axios.spread((res1, res2) => {
            console.log('POSTS', res1.data)
            if (res1.data.length > 0) {
                setPosts(res1.data);
            }
            console.log('PINNED', res2.data)
            if (res2.data.length > 0) {
               setPinnedPosts(res2.data); 
            }
        } )) 
        .catch(console.error);   
    }, [])


    return (
        <div className='Discussion'>
            <PostContext.Provider value={{
                pinPost,
                deletePost
            }}>
                <NewPost project={project} />
                <hr />
                {(pinnedPosts) &&
                    <PinnedPosts 
                        admins={admins} 
                        posts={pinnedPosts} 
                        pinPost={pinPost}
                    />
                }
                {(posts) &&
                    <Posts 
                        admins={admins} 
                        posts={posts}
                        pinPost={pinPost}
                        />
                }
            </ PostContext.Provider>
            
        </div>
    );
}

export default Discussion;