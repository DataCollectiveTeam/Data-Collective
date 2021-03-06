import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../DataContext';
import DataVisItem from './DataVisItem';

function DataVis({procData, project}) {

    const { URL } = useContext(DataContext);

    const [dataVisItems, setDataVisItems] = useState(null);
    const [dataVisChange, setDataVisChange] = useState(false);

    useEffect(() => {
        const url = `${URL}/project_data_vis/${project.id}`
        axios.get(url)
            .then(res => setDataVisItems(res.data))
            .catch(console.error);
    }, [dataVisChange])

    return (
        <div className='DataVis'>
            {/* 
                create a data vis item component for each data 
                vis item associated with this project
            */}
            {dataVisItems &&
                dataVisItems.map(item => {
                    return <DataVisItem 
                                key={item.id} 
                                item={item} 
                                procData={procData} 
                                project={project}
                                dataVisChange={dataVisChange}
                                setDataVisChange={setDataVisChange}
                            />
                })
            }
        </div>
    );
}

export default DataVis;