import React, { useContext, useEffect, useState } from 'react';
import NewPost from './Posts/NewPost';
import PinnedPosts from './Posts/PinnedPosts';
import Posts from './Posts/Posts';
import axios from 'axios';
import { DataContext } from '../../DataContext';
import { PostContext } from './Posts/PostContext';

function Discussion({project, admins}) {

    const {thisUser, URL} = useContext(DataContext);

    const [posts, setPosts] = useState(null);
    const [pinnedPosts, setPinnedPosts] = useState(null);
    const [editPost, setEditPost] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [showNewPostModal, setShowNewPostModal] = useState(false);
    const [pin, setPin] = useState(false);
    const [posted, setPosted] = useState(false);

    const pinPost = (thisPost) => {
        let postToPin = thisPost;
        postToPin.pinned = !postToPin.pinned;
        const url = `${URL}/posts/${thisPost.id}`
        axios.put(url, postToPin)
            .then(res => {
                console.log(postToPin)
                setPin(!pin)
            })
            .catch(console.error);
        
    }

    const deletePost = (thisPost) => {
        const url = `${URL}/posts/${thisPost.id}`
        axios.delete(url)
            .then(res => setConfirmDelete(false))
            .catch(console.error);
        
    }

    useEffect(() => {
        const url = `${URL}/project_posts/${project.id}`
        const url2 = `${URL}/pinned_posts/${project.id}`
        axios.all([
            axios.get(url),
            axios.get(url2)
        ])
        .then(axios.spread((res1, res2) => {
            console.log('POSTS', res1.data)
            setPosts(res1.data);
            
            console.log('PINNED', res2.data)
            setPinnedPosts(res2.data); 
            
        } )) 
        .catch(console.error);   
    }, [showNewPostModal, editPost, confirmDelete, pin, posted])

    return (
        <div className='Discussion'>
            <PostContext.Provider value={{
                pinPost,
                deletePost,
                confirmDelete,
                setConfirmDelete
            }}>
                {(showNewPostModal) && 
                    <NewPost project={project} setShowNewPostModal={setShowNewPostModal} posted={posted} setPosted={setPosted}/>
                }
                {(thisUser.id !== 0) &&
                    <button className='new-post-button' type='button' onClick={() => setShowNewPostModal(true)} >new post</button>
                }
                {(pinnedPosts && posts) &&
                    <div>
                        <PinnedPosts 
                            admins={admins} 
                            posts={pinnedPosts} 
                            pinPost={pinPost}
                            editPost={editPost}
                            setEditPost={setEditPost}
                        />
                        <Posts 
                            admins={admins} 
                            posts={posts}
                            pinPost={pinPost}
                            editPost={editPost}
                            setEditPost={setEditPost}
                        />
                    </div>
                }
            </ PostContext.Provider>
        </div>
    );
}

export default Discussion;