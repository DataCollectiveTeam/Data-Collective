import React, { useState,useEffect, useContext } from "react";
import UserBio from './UserBio';
import UserProjects from './UserProjects';
import EditUserModal from './../Modals/EditUserModal'
import axios from 'axios';
import './UserView.css';
import { DataContext } from "../../DataContext";

const User = ({id}) => {

    const { URL } = useContext(DataContext);

    const [user, setUser] = useState(null)
    const [userProjects, setUserProjects] = useState(null)
    const [userContributions, setUserContributions] = useState(null)
    const [editUserModal, setEditUserModal] = useState(false)

    useEffect(() => {
        const url = `${URL}/citizens/${id}`;
        const aUrl = `${URL}/alist/${id}`;
        const cUrl = `${URL}/contributions/${id}`;

        getUser(url);
        getAList(aUrl);
        getContributions(cUrl);

    }, [id]);

    function getUser(url){
        axios.get(url)
        .then(res => {
            setUser(res.data);
        })
        .catch(console.error);
    }

    function getAList(url){
        axios.get(url)
        .then(res => {
            setUserProjects(res.data);
        })
        .catch(console.error);
    }

    function getContributions(url){
        axios.get(url)
        .then(res => {
            setUserContributions(res.data);
            console.log(res.data)
        })
        .catch(console.error);
    }

    if(user){
        return (
            <div className="User">
                {(editUserModal === true) && 
                <EditUserModal user={user} setEditUserModal={setEditUserModal}/>
                }
                <UserBio user={user} setEditUserModal={setEditUserModal}/>
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