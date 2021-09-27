import React, { useState,useEffect } from "react";
import UserBio from './UserBio';
import UserProjects from './UserProjects';
import EditUserModal from './../Modals/EditUserModal'
import DeleteUserModal from './../Modals/DeleteUserModal'
import axios from 'axios';
import './UserView.css';

const User = ({id}) => {

    const [user, setUser] = useState(null)
    const [userProjects, setUserProjects] = useState(null)
    const [userContributions, setUserContributions] = useState(null)
    const [editUserModal, setEditUserModal] = useState(false)
    const [deleteUserModal, setDeleteUserModal] = useState(false)

    useEffect(() => {
        const url = `http://localhost:8000/citizens/${id}`;
        const aUrl = `http://localhost:8000/alist/${id}`;
        const cUrl = `http://localhost:8000/contributions/${id}`;

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
            console.log(res.data)
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
                <EditUserModal user={user} setEditUserModal={setEditUserModal} setDeleteUserModal={setDeleteUserModal}/>
                }
                {(deleteUserModal === true) && 
                <DeleteUserModal user={user} setDeleteUserModal={setDeleteUserModal}/>
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