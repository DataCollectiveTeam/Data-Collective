import React, { useState,useEffect } from "react";
import UserBio from './UserBio';
import UserProjects from './UserProjects';
import axios from 'axios';

const User = ({id}) => {

    const [user, setUser] = useState(null)

    useEffect(() => {
        const url = `http://localhost:8000/citizens/${id}`;
        axios.get(url)
          .then(res => {
            setUser(res.data);
            })
          .catch(console.error);
    }, [id]);

    if(user){
        return (
            <div className="User">
                <UserBio user={user}/>
                <UserProjects user={user}/>
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