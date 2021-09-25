import React from 'react';

function DataPoint({point}) {
    console.log('point')
    console.log(point)

    let dataToRender = [];

    for (let key in point) {
        if (key !== 'id' && key !== 'contributor') {
            dataToRender.push([key, point[key]])
        }
    }

    

    if (dataToRender !== []) {
        return (
            <div className='DataPoint'>
                {dataToRender.map(pair => {
                    return <p>{pair[0]}: {pair[1]}</p>
                })}
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