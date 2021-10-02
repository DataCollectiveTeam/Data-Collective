import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Chart } from 'react-google-charts';
import { DataContext } from '../../DataContext';
import EditVisModal from '../Modals/EditVisModal';

function DataVisItem({item, procData, project, dataVisChange, setDataVisChange}) {

    //import current user and backend url from datacontext
    const {thisUser, URL} = useContext(DataContext);

    //toggle edit modal
    const [showEditVisModal, setShowEditVisModal] = useState(false);

    //declaring empty variables to be passed to charts
    let options = {};
    let data = [];
    let xValues = [];
    let yValues = []
    options.title = item.chart_title;
    //append legend if user chose to display legend 
    if (item.legend === true) {
        options.legend = {position: 'bottom'}
    }
    
    //cases for each chart type
    if (item.chart_type === 'LineChart') {

        let categorySort = {}

        procData.forEach(point => {
            (categorySort[point[item.x_axis]] === undefined)
            ? categorySort[point[item.x_axis]] = [point[item.y_axis]]
            : categorySort[point[item.x_axis]].push(point[item.y_axis])
        })

        for (let cat in categorySort){

            let sum = categorySort[cat].reduce((a, b) => a + b, 0)
            let avg = (sum/ categorySort[cat].length) || 0;
            xValues.push(cat);
            yValues.push(sum);
            let val =[cat, avg];
            data.push(val);
        }

        //fill in chart options with chosen values
        options.hAxis = { title: item.x_axis, viewWindow: { min: Math.min(xValues)-(Math.max(xValues)*1.1), max: (Math.max(xValues)*1.1)} };
        options.vAxis = { title: item.y_axis, viewWindow: { min: Math.min(yValues)-(Math.max(yValues)*1.1), max: (Math.max(yValues)*1.1)} };
        // sort data in ascending order
        data.sort((a, b) => {
            return a[0] - b[0]
        })
    } else if (item.chart_type === 'BarChart') {
        //bar colors
        let colors = ['red', 'blue', 'green', 'yellow', 'gray', 'purple'];
        //count for cycling through colors
        let colorIndex = 0;
        //for each data point...
        let categorySort = {}
        
        procData.forEach(point => {
            (categorySort[point[item.x_axis]] === undefined)
            ? categorySort[point[item.x_axis]] = [point[item.y_axis]]
            : categorySort[point[item.x_axis]].push(point[item.y_axis])
        })

        for (let cat in categorySort){
            (colorIndex>=(colors.length-1) ? colorIndex=0 : colorIndex ++)

            let sum = categorySort[cat].reduce((a, b) => a + b, 0)
            let avg = (sum/ categorySort[cat].length) || 0;

            let val = [cat, avg, `color: ${colors[colorIndex]}`];
            data.push(val);
        }

        //fill in chart options with chosen values
        options.hAxis = { title: item.y_axis };
        options.vAxis = { title: item.x_axis }
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
        options.pieHole = 0;
    }

    //shows edit visualization modal
    const editVis = () => {
        setShowEditVisModal(true);
    }

    //deletes the visualization
    const deleteVis = () => {
        const url = `${URL}/data_vis/${item.id}`
        axios.delete(url)
            .then(res => setDataVisChange(!dataVisChange))
            .catch(console.error);
    }

    return (
        <div className='DataVisItem'>
            {showEditVisModal && 
                <EditVisModal 
                    item={item} 
                    procData={procData} 
                    p={project} 
                    setShowEditVisModal={setShowEditVisModal}
                    dataVisChange={dataVisChange}
                    setDataVisChange={setDataVisChange}
                    />
            }
            {(project.admin_list.includes(parseInt(thisUser.id))) &&
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
                    width='100%'
                    height='100%'
                    legendToggle
                />
            }
            {(item.chart_type === 'BarChart') &&
                <Chart 
                    chartType={item.chart_type}
                    data={[[item.x_axis, item.y_axis, {role: 'style'}], ...data]}
                    options={options}
                    width='100%'
                    height='100%'
                    legendToggle
                />
            }
            {(item.chart_type === 'PieChart') &&
                <Chart   
                    chartType={item.chart_type}
                    data={[[item.x_axis, "Frequency"], ...data]}
                    options={options}
                    width='100%'
                    height='100%'
                    legendToggle
                />
            }
            
        </div>
    );
}

export default DataVisItem;