import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataVisItem from './DataVisItem';

function DataVis({procData, project}) {

    const [dataVisItems, setDataVisItems] = useState(null);

    useEffect(() => {
        const url = `http://localhost:8000/project_data_vis/${project.id}`
        axios.get(url)
            .then(res => setDataVisItems(res.data))
            .catch(console.error);
    }, [])

    return (
        <div className='DataVis'>
            {/* 
                create a data vis item component for each data 
                vis item associated with this project
            */}
            {dataVisItems &&
                dataVisItems.map(item => {
                    return <DataVisItem key={item.id} item={item} procData={procData} project={project}/>
                })
            }
        </div>
    );
}

export default DataVis;