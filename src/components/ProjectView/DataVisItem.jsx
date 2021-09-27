import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Chart } from 'react-google-charts';
import { DataContext } from '../../DataContext';
import EditVisModal from '../Modals/EditVisModal';

function DataVisItem({item, procData, project}) {

    const {thisUser} = useContext(DataContext);
    const [showEditVisModal, setShowEditVisModal] = useState(false);

    let options;

    let data = [
    ]
    if (item.chart_type === 'LineChart') {
        procData.forEach(point => {
        let val = [point[item.x_axis], point[item.y_axis]];
        data.push(val);
        })
        options = {
            title: item.chart_title,
            hAxis: { title: item.x_axis, viewWindow: { min: item.x_axis_min, max: item.x_axis_max} },
            vAxis: { title: item.y_axis, viewWindow: { min: item.y_axis_min, max: item.y_axis_max} },
            legend: 'none'
        }
        if (item.legend === true) {
            options.legend = {position: 'bottom'}
        }
    } else if (item.chart_type === 'Histogram') {
        procData.forEach(point => {
            let val = [point[item.x_axis]];
            data.push(val);
            })
        options = {
            title: item.chart_title,
            hAxis: { title: item.x_axis, viewWindow: { min: item.x_axis_min, max: item.x_axis_max} },
            vAxis: { title: 'frequency', viewWindow: { min: item.y_axis_min, max: item.y_axis_max} },
            legend: 'none'
        }
        if (item.legend === true) {
            options.legend = {position: 'bottom'}
        }
    } else if (item.chart_type === 'BarChart') {
        let colors = ['red', 'blue', 'green', 'yellow', 'gray', 'purple'];
        let count = 0;
        procData.forEach(point => {
            if (count === colors.length - 1) {
                count = 0;
            } else {
                count++
            }
            let val = [point[item.x_axis], point[item.y_axis], `color: ${colors[count]}`];
            data.push(val);
            })
        options = {
            title: item.chart_title,
            hAxis: { title: item.x_axis, viewWindow: { min: item.x_axis_min, max: item.x_axis_max} },
            vAxis: { title: item.y_axis, viewWindow: { min: item.y_axis_min, max: item.y_axis_max} },
            legend: 'none'
        }
        if (item.legend === true) {
            options.legend = {position: 'bottom'}
        }
    } else if (item.chart_type === 'PieChart') {
        let counts = {}
        procData.forEach(point => {
            console.log(point)
            if (counts[point[item.x_axis]] === undefined) {
                counts[point[item.x_axis]] = 1;
            } else {
                counts[point[item.x_axis]]++;
            }
        })
        for (let key in counts) {
            let val = [key, counts[key]];
            console.log(val)
            data.push(val)
        }
        options = {
            title: item.chart_title,
            pieHole: item.pie_hole,
            legend: 'none'
        }
        if (item.legend === true) {
            options.legend = {position: 'bottom'}
        }
    }

    data.sort((a, b) => {
        return a[0] - b[0]
    })

    const editVis = () => {
        setShowEditVisModal(true);
    }

    const deleteVis = () => {
        const url = `http://localhost:8000/data_vis/${item.id}`
        axios.delete(url)
            .then(res => console.log(res))
            .catch(console.error);
    }

    return (
        <div className='DataVisItem'>
            {showEditVisModal && 
                <EditVisModal item={item} procData={procData} project={project} setShowEditVisModal={setShowEditVisModal}/>
            }
            {(project.admin_list.some(admin => admin === parseInt(thisUser.id))) &&
                <div>
                    <button type='button' onClick={editVis} >edit visualization</button>
                    <button type='button' onClick={deleteVis} >delete visualization</button>
                </div>
                
            }
            {(item.chart_type === 'LineChart') &&
                <Chart 
                    chartType={item.chart_type}
                    data={[[item.x_axis, item.y_axis], ...data]}
                    options={options}
                    width='80%'
                    height='500px'
                    legendToggle
                />
            }
            {(item.chart_type === 'Histogram') &&
                <Chart 
                    chartType={item.chart_type}
                    data={[[item.x_axis], ...data]}
                    options={options}
                    width='80%'
                    height='500px'
                    legendToggle
                />
            }
            {(item.chart_type === 'BarChart') &&
                <Chart 
                    chartType={item.chart_type}
                    data={[[item.x_axis, item.y_axis, {role: 'style'}], ...data]}
                    options={options}
                    width='80%'
                    height='500px'
                    legendToggle
                />
            }
            {(item.chart_type === 'PieChart') &&
                <Chart 
                    chartType={item.chart_type}
                    data={[[item.x_axis, item.y_axis], ...data]}
                    options={options}
                    width='80%'
                    height='500px'
                    legendToggle
                />
            }
            
        </div>
    );
}

export default DataVisItem;