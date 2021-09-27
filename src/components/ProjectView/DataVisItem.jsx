import React from 'react';
import { Chart } from 'react-google-charts';

function DataVisItem({item, procData}) {

    let options = {
        title: item.chart_title,
        hAxis: { title: item.x_axis, viewWindow: { min: item.x_axis_min, max: item.x_axis_max} },
        vAxis: { title: item.y_axis, viewWindow: { min: item.y_axis_min, max: item.y_axis_max} },
        legend: 'none'
    }

    let data = [
        [item.x_axis, item.y_axis]
    ]

    procData.forEach(point => {
        let val = [point[item.x_axis], point[item.y_axis]];
        data.push(val);
    })

    return (
        <div className='DataVisItem'>
            <Chart 
                chartType={item.chart_type}
                data={data}
                options={options}
                width='80%'
                height='500px'
                legendToggle
            />
        </div>
    );
}

export default DataVisItem;