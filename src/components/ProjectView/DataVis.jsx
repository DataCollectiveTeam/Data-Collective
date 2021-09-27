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
            {dataVisItems &&
                dataVisItems.map(item => {
                    return <DataVisItem key={item.id} item={item} procData={procData} project={project}/>
                })
            }
            {/* <table>
                <tr>
                    {Object.keys(procData[0]).map(header => {
                        if (header !== 'id' && header !== 'contributor') {
                            return <th key={header}>{header}</th>
                        }
                    })}
                </tr>
                {procData.map(point => {
                    return (
                        <tr>
                            {Object.entries(point).map(val => {
                                if (val[0] !== 'id' && val[0] !== 'contributor') {
                                   return <td key={val[1]}>{val[1]}</td> 
                                }
                            })}
                        </tr>
                    )
                })}
            </table> */}
            {/* <Chart 
                chartType='LineChart'
                data={data}
                options={options}
                width='80%'
                height='500px'
                legendToggle
            /> */}
        </div>
    );
}

export default DataVis;