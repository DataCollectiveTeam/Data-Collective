import React, { useEffect } from 'react';
import DataPoint from './DataPoint';

function RawData({data}) {

    let labelRegEx = '_label';
    let optionsRegEx = 'Options';

    let processedData = [];

    data.forEach(entry => {
        let validData = {};
        for (let key in entry) {
            if (key !== 'id' &&
                key !== 'project' &&
                key !== 'contributor' &&
                key.match(labelRegEx) === null &&
                key.match(optionsRegEx) === null &&
                entry[key] !== null &&
                entry[key] !== ''
                ) { 
                    if (key === 'lat') {
                        validData['latitude'] = entry[key]
                    } else if (key === 'lon') {
                        validData['longitude'] = entry[key]
                    } else if (
                        key !== 'notes' &&
                        key !== 'zipcode' 
                        ) {
                            let label = `${key}_label`;
                            validData[entry[label]] = entry[key]
                    } else {
                        validData[key] = entry[key]
                    }  
                }
            }

        validData['id'] = entry.id
        validData['contributor'] = entry.contributor
        console.log(validData)
        processedData.push(validData);
        
        })
    

    return (
        <div>
            {processedData.map(entry => {
                return <DataPoint key={entry.id} point={entry} />
            })}
        </div>
    );
}

export default RawData;