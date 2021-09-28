import React from 'react';

const CitizenCard = ({c}) => {
    return (
        <a className="CitizenCard" href={`/citizens/${c.id}`}>
            <h4>{c.name}</h4>
            <img className="citizen-pic" src={c.img} alt="profile"/>
        </a>
    );
};

export default CitizenCard;