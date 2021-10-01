import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../DataContext';
import DataPoint from './DataPoint';

function RawData({procData, creator, admins, setAddData, dataDeleted, setDataDeleted }) {

    const {thisUser} = useContext(DataContext);

    procData = procData.reverse()

    //maps through processed data and displays each point in a 'DataPoint' component
    return (
        <div className='RawData'>
            {(thisUser.id !== 0) &&
                <button className='new-data-button' type='button' onClick={() => setAddData(true)} >log data</button>
            }
            {procData.map(entry => {
                return <DataPoint key={entry.id} point={entry} creator={creator} admins={admins} dataDeleted={dataDeleted} setDataDeleted={setDataDeleted}/>
            })}
        </div>
    );
}

export default RawData;