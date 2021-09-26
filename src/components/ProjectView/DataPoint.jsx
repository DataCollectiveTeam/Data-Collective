import axios from 'axios';
import React, { useContext, useState } from 'react';
import { DataContext } from '../../DataContext';

function DataPoint({point, creator, admins}) {

    const {thisUser} = useContext(DataContext);

    let dataToRender = [];

    for (let key in point) {
        if (key !== 'id' && key !== 'contributor') {
            dataToRender.push([key, point[key]])
        }
    }

    const deletePoint = () => {
        const url = `http://localhost:8000/data_entries/${point.id}`;
        axios.delete(url)
            .then(res => console.log(res))
            .catch(console.error);
    }

    if (dataToRender !== []) {
        return (
            <div className='DataPoint'>
                {dataToRender.map(pair => {
                    return <p key={pair[0]}>{pair[0]}: {pair[1]}</p>
                })}
                {(admins.some(admin => admin === parseInt(thisUser.id)) === true) &&
                 (point.contibutor === parseInt(thisUser.id)) &&
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