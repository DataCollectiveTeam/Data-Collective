import React from 'react';

const UserBio = ({user}) => {
    
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
        </div>
    );
};

export default UserBio;