import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Chart } from 'react-google-charts';
import { DataContext } from '../../DataContext';
import EditVisModal from '../Modals/EditVisModal';

function DataVisItem({item, procData, project}) {

    //import current user and backend url from datacontext
    const {thisUser, URL} = useContext(DataContext);

    //toggle edit modal
    const [showEditVisModal, setShowEditVisModal] = useState(false);

    //declaring empty variables to be passed to charts
    let options;
    let data = [];
    let xValues = [];
    let yValues = []

    //strings should have accessible counts and values
    // if(typeof item.x_axis === "string"){
    //     console.log("string")
    // }

    //cases for each chart type
    if (item.chart_type === 'LineChart') {
        //for each data point, create a sub array
        //that holds each chosen items' value
        //and push the sub array into the data array
        //for rendering
        procData.forEach(point => {
        let val = [point[item.x_axis], point[item.y_axis]];
        xValues.push(point[item.x_axis]);
        yValues.push(point[item.y_axis]);
        data.push(val);
        })
        //fill in chart options with chosen values
        options = {
            title: item.chart_title,
            hAxis: { title: item.x_axis, viewWindow: { min: Math.min(xValues)-(Math.max(xValues)*1.1), max: (Math.max(xValues)*1.1)} },
            vAxis: { title: item.y_axis, viewWindow: { min: Math.min(yValues)-(Math.max(yValues)*1.1), max: (Math.max(yValues)*1.1)} },
            legend: 'none'
        }
        //append legend if user chose to display legend 
        if (item.legend === true) {
            options.legend = {position: 'bottom'}
        }
        // sort data in ascending order
        data.sort((a, b) => {
            return a[0] - b[0]
        })
    } else if (item.chart_type === 'Histogram') {
        //for each data point, create a sub array
        //that holds the chosen item's value
        //and push the sub array into the data array
        //for rendering
        procData.forEach(point => {
            let val = [point[item.x_axis]];
            data.push(val);
            })
        //fill in chart options with chosen values
        //y axis automatically set to frequency for histogram
        options = {
            title: item.chart_title,
            hAxis: { title: item.x_axis, viewWindow: { min: Math.min(xValues)-(Math.max(xValues)*1.1), max: (Math.max(xValues)*1.1)} },
            vAxis: { title: item.y_axis, viewWindow: { min: Math.min(yValues)-(Math.max(yValues)*1.1), max: (Math.max(yValues)*1.1)} },
            legend: 'none'
        }
        //append legend if user chose to display legend 
        if (item.legend === true) {
            options.legend = {position: 'bottom'}
        }
    } else if (item.chart_type === 'BarChart') {
        //bar colors
        let colors = ['red', 'blue', 'green', 'yellow', 'gray', 'purple'];
        //count for cycling through colors
        let count = 0;
        //for each data point...
        procData.forEach(point => {
            //if color is last in colors, set count to 0, otherwise increment count
            (count === colors.length - 1) ? count = 0 : count++;
            // create a sub array with the chosen items' values 
            // and the color determined from the count
            // then push the sub array into the data array
            // for rendering 
            let val = [point[item.x_axis], point[item.y_axis], `color: ${colors[count]}`];
            data.push(val);
            })
        //fill in chart options with chosen values
        options = {
            title: item.chart_title,
            hAxis: { title: item.y_axis, viewWindow: { min: Math.min(item.y_axis), max: Math.max(item.y_axis)} },
            legend: 'none'
        }
        //append legend if user chose to display legend 
        if (item.legend === true) {
            options.legend = {position: 'bottom'}
        }
    } else if (item.chart_type === 'PieChart') {
        //declare empty counts object
        let counts = {}
        // for each data point...
        procData.forEach(point => {
            // if value count does not exist
            //create a key in the counts object with a value of one
            //otherwise, increment the existing count
            (counts[point[item.x_axis]] === undefined) 
            ? counts[point[item.x_axis]] = 1 
            : counts[point[item.x_axis]]++;
        })
        // for every key in counts
        // create a sub array that holds the key name
        // and its count
        // then push the sub array into the data array
        // for rendering
        for (let key in counts) {
            let val = [key, counts[key]];
            data.push(val)
        }
        //fill in chart options with chosen values
        options = {
            title: item.chart_title,
            pieHole: 0,
            legend: 'none'
        }
        //append legend if user chose to display legend 
        if (item.legend === true) {
            options.legend = {position: 'bottom'}
        }
    }

    //shows edit visualization modal
    const editVis = () => {
        setShowEditVisModal(true);
    }

    //deletes the visualization
    const deleteVis = () => {
        const url = `${URL}/data_vis/${item.id}`
        axios.delete(url)
            .then(res => console.log(res))
            .catch(console.error);
    }

    return (
        <div className='DataVisItem'>
            {showEditVisModal && 
                <EditVisModal item={item} procData={procData} p={project} setShowEditVisModal={setShowEditVisModal}/>
            }
            {(project.admin_list.some(admin => admin === parseInt(thisUser.id))) &&
                <div className='vis-interaction-buttons'>
                    <button className='edit-vis-button' type='button' onClick={editVis} >edit visualization</button>
                    <button className='delete-vis-button' type='button' onClick={deleteVis} >delete visualization</button>
                </div>
                
            }
            {(item.chart_type === 'LineChart') &&
                <Chart 
                    chartType={item.chart_type}
                    data={[[item.x_axis, item.y_axis], ...data]}
                    options={options}
                    width='500px'
                    height='500px'
                    legendToggle
                />
            }
            {(item.chart_type === 'Histogram') &&
                <Chart 
                    chartType={item.chart_type}
                    data={[[item.x_axis], ...data]}
                    options={options}
                    width='500px'
                    height='500px'
                    legendToggle
                />
            }
            {(item.chart_type === 'BarChart') &&
                <Chart 
                    chartType={item.chart_type}
                    data={[[item.x_axis, item.y_axis, {role: 'style'}], ...data]}
                    options={options}
                    width='500px'
                    height='500px'
                    legendToggle
                />
            }
            {(item.chart_type === 'PieChart') &&
                <Chart   
                    chartType={item.chart_type}
                    data={[[item.x_axis, item.y_axis], ...data]}
                    options={options}
                    width='500px'
                    height='500px'
                    legendToggle
                />
            }
            
        </div>
    );
}

export default DataVisItem;