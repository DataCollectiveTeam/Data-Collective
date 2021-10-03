import React, { useContext, useEffect, useState } from 'react';
import NewPost from './Posts/NewPost';
import PinnedPosts from './Posts/PinnedPosts';
import Posts from './Posts/Posts';
import axios from 'axios';
import { DataContext } from '../../DataContext';
import { PostContext } from './Posts/PostContext';

function Discussion({project, admins}) {

    const {thisUser, URL} = useContext(DataContext);

    const [regPosts, setRegPosts] = useState(null);
    const [pinnedPosts, setPinnedPosts] = useState(null);
    const [showNewPostModal, setShowNewPostModal] = useState(false);
    const [pin, setPin] = useState(false);
    const [posted, setPosted] = useState(false);
    const [wasDeleted, setWasDeleted] = useState(false);
    const [wasEdited, setWasEdited] = useState(false);

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
            .then(res => setWasDeleted(!wasDeleted))
            .catch(console.error);
        
    }

    const submitEdit = (thisPost) => {
        const url = `${URL}/posts/${thisPost.id}`
        axios.put(url, thisPost)
            .then(res => setWasEdited(!wasEdited))
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
            setRegPosts(res1.data);
            
            console.log('PINNED', res2.data)
            setPinnedPosts(res2.data); 
            
        } )) 
        .catch(console.error);   
    }, [showNewPostModal, wasDeleted, pin, posted, wasEdited])

    return (
        <div className='Discussion'>
            <PostContext.Provider value={{
                pinPost,
                deletePost,
                submitEdit
            }}>
                {(showNewPostModal) && 
                    <NewPost project={project} setShowNewPostModal={setShowNewPostModal} posted={posted} setPosted={setPosted}/>
                }
                {(thisUser.id !== 0) &&
                    <button className='new-post-button' type='button' onClick={() => setShowNewPostModal(true)} ><i class="fas fa-pen-nib"></i></button>
                }
                {(pinnedPosts && regPosts) &&
                    <div>
                        <PinnedPosts 
                            admins={admins} 
                            posts={pinnedPosts} 
                            pinPost={pinPost}
                        />
                        <Posts 
                            admins={admins} 
                            posts={regPosts}
                            pinPost={pinPost}
                        />
                    </div>
                }
            </ PostContext.Provider>
        </div>
    );
}

export default Discussion;