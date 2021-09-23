import React, { useState,useEffect } from "react";
import UserBio from './UserBio';
import UserProjects from './UserProjects';
import axios from 'axios';
import './UserView.css';

const User = ({id}) => {

    const [user, setUser] = useState(null)
    const [userProjects, setUserProjects] = useState(null)
    const [userContributions, setUserContributions] = useState(null);

    useEffect(() => {
        const url = `http://localhost:8000/citizens/${id}`;
        const projectsUrl = 'http://localhost:8000/projects'
        axios.get(url)
          .then(res => {
                setUser(res.data);
            })
          .catch(console.error);
        axios.get(projectsUrl)
            .then(res => {
                let projectsCreated = res.data.filter(proj => proj.creator.toString() === id)
                if (projectsCreated.length > 0) {
                    setUserProjects(projectsCreated)
                }
                let projectsContributed = res.data.filter(proj => (proj.contributor_list).some(contributor => contributor.toString() === id))
                if (projectsContributed.length > 0) {
                    setUserContributions(projectsContributed)
                }
            })
            .catch(console.error)
    }, [id]);

    if(user){
        return (
            <div className="User">
                <UserBio user={user}/>
                <h3 className='projects-header'>projects this user has created</h3>
                {userProjects 
                    ? <UserProjects projects={userProjects}/>
                    : <h4>this user has not created any projects</h4>
                }
                <h3 className='projects-header'>projects this user has contributed to</h3>
                {userContributions 
                    ? <UserProjects projects={userContributions}/>
                    : <h4>this user has not contributed to any projects</h4>
                }
            </div>
          );
    } else {
        return (
            <div className="User">
                <p>Loading...</p>
            </div>
        );
      }
}
export default User;