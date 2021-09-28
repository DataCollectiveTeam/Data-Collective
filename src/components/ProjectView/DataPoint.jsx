import axios from 'axios';
import React, { useContext, useState } from 'react';
import { DataContext } from '../../DataContext';

function DataPoint({point, admins}) {

    const {thisUser, URL} = useContext(DataContext);

    let dataToRender = [];
    //pass each key-value pair into dataToRender
    //except for ID and contributor
    for (let key in point) {
        if (key !== 'id' && key !== 'contributor') {
            dataToRender.push([key, point[key]])
        }
    }

    //deletes this data point from the database
    const deletePoint = () => {
        const url = `${URL}/data_entries/${point.id}`;
        axios.delete(url)
            .then(res => console.log(res))
            .catch(console.error);
    }


    if (dataToRender !== []) {
        return (
            <div className='DataPoint'>
                {/* 
                    maps through the dataToRender array 
                */}
                {dataToRender.map(pair => {
                    return <p key={pair[0]}>{pair[0]}: {pair[1]}</p>
                })}
                {/* 
                    if the currently logged in user is: 
                        an admin on this project
                        or the user who submitted this data
                    
                    give them the option to delete this data point
                */}
                {((admins.some(admin => admin === parseInt(thisUser.id)) === true) ||
                 (point.contributor === parseInt(thisUser.id))) &&
                    <button type='button' onClick={deletePoint} >delete data point</button> 
                }
            </div>
        );
    } else {
        return (
            <div className='DataPoint'>
                <p>loading data point</p>
            </div>
        )
    }
}

export default DataPoint;