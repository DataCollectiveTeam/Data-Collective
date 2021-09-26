import React, { useEffect } from 'react';
import DataPoint from './DataPoint';

function RawData({procData, creator, admins, }) {

    return (
        <div>
            {procData.map(entry => {
                return <DataPoint key={entry.id} point={entry} creator={creator} admins={admins}/>
            })}
        </div>
    );
}

export default RawData;