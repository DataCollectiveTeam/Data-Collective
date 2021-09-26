import React from 'react';
import { Chart } from 'react-google-charts';

function DataVis({procData}) {

    let options = {
        title: 'Temp High vs Humidity',
        hAxis: { title: "Temp High", viewWindow: { min: 0, max: 100} },
        vAxis: { title: "Humidity", viewWindow: { min: 0, max: 100} },
        legend: 'none'
    }

    let data = [
        ['temp high', 'humidity']
    ]

    procData.forEach(point => {
        let val = [point['temp high'], point['humidity']];
        data.push(val);
    })

    console.log(data);

    return (
        <div>
            <table>
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
            </table>
            <Chart 
                chartType='LineChart'
                data={data}
                options={options}
                width='80%'
                height='500px'
                legendToggle
            />
        </div>
    );
}

export default DataVis;