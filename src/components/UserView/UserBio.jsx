import React, { useState,useEffect, useContext } from "react";
import { DataContext } from "../../DataContext";

const UserBio = ({user, setEditUserModal, setDeleteUserModal}) => {

    const [profileOwner, setProfileOwner] = useState(false)
    const {thisUser} = useContext(DataContext);

    useEffect(() => {
        checkOwner()
      }, []);

    function checkOwner(){
        if (parseInt(thisUser.id) === parseInt(user.id)){
            setProfileOwner(true)
        }
    }
    
    let dateOptions = {year: 'numeric', month: 'long', day: 'numeric'};
    let date = new Date(Date(user.account_created)).toLocaleDateString(undefined, dateOptions)
    
    return (
        <div className='UserBio'>
            <div className='user-profile'>
                <img className='user-profile-img' src={user.img} alt={user.name} />
                <div className='user-info'>
                    <h2 className='username'>{user.name}</h2>
                    <h4 className='user-bio'>{user.bio}</h4>
                    <h5 className='date-joined'>Joined: {date}</h5>
                </div>
            </div>
            <div className='profile-interaction'>
            
            {profileOwner ? <button className='user-edit-button' type='button' onClick={() => setEditUserModal(true)}>edit profile</button> : null}
            
            </div>
        </div>
    );
};

export default UserBio;