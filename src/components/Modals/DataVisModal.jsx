import axios from 'axios';
import React, { useContext, useState } from 'react';
import { DataContext } from '../../DataContext';
import './Modals.css'

function DataVisModal({p, setShowDataVisModal, procData}) {
    
    //import the current user and backend url from datacontext
    const {thisUser, URL} = useContext(DataContext);

    //create an array to store the options for x/y values
    let options = [];

    //if there is an array of processed data, add all keys except notes to the options array
    if(procData[0]){
        for (let key in procData[0]) {
            if (key !== 'notes') {
                    options.push(key)
                }
            } 
    }

    //default state of datavis form
    const defaultDataVis = {
        project: p.id,
        contributor: thisUser.id,
        chart_type: 'LineChart',
        chart_title: "",
        x_axis: options[0],
        y_axis: options[1],
        legend: false,
    }
     
    //store datavis form in state
    const [dataVis, setDataVis] = useState(defaultDataVis);

    //update properties of datavis state object
    const handleChange = (e) => {
        setDataVis({...dataVis, [e.target.id]: e.target.value})
    }

    //post datavis to db
    const handleSubmit = () => {
        const url = `${URL}/data_vis/`
        axios.post(url, dataVis)
            .then(res => console.log(res))
            .catch(console.error);
        setShowDataVisModal(false);
    }

    //if no data, render warning
    if (!procData[0]){
        return (
            <div>
                <p>Enter data before creating a visualization</p>
            </div>
        )
    }
    //else render form
    else {
    return (
        <div className='modal-background'>
            <div className='modal-textbox'>

                {/* select chart type */}
                <select id='chart_type' onChange={handleChange}>
                    <option value='LineChart'>Line Chart</option>
                    <option value='BarChart'>Bar Chart</option>
                    <option value='Histogram'>Histogram</option>
                    <option value='PieChart'>Pie Chart</option>
                </select>
                <p>enter chart title</p>
                <input type='text' id='chart_title' placeholder='chart title' onChange={handleChange} />
                
                {/* inputs for line chart */}
                {(dataVis.chart_type === 'LineChart') &&
                    <div>
                        <p>x axis</p>
                        <select id='x_axis' onChange={handleChange}>
                            {options.map(option => {
                                return <option key={option} value={option}>{option}</option>
                            })}
                        </select>
                        <p>y axis</p>
                        <select id='y_axis' onChange={handleChange}>
                            {options.map(option => {
                                return <option key={option} value={option}>{option}</option>
                            })}
                        </select>
                    </div>
                }

                {/* inputs for line histogram */}
                {(dataVis.chart_type === 'Histogram') &&
                    <div>
                        <p>field to analyze</p>
                        <select id='x_axis' onChange={handleChange}>
                            {options.map(option => {
                                return <option key={option} value={option}>{option}</option>
                            })}
                        </select>
                    </div>
                }

                {/* inputs for bar chart */}
                {(dataVis.chart_type === 'BarChart') &&
                    <div>
                        <p>x axis</p>
                        <select id='x_axis' onChange={handleChange}>
                            {options.map(option => {
                                return <option key={option} value={option}>{option}</option>
                            })}
                        </select>
                        <p>y axis</p>
                        <select id='y_axis' onChange={handleChange}>
                            {options.map(option => {
                                return <option key={option} value={option}>{option}</option>
                            })}
                        </select>
                    </div>
                }
                
                {/* inputs for pie chart */}
                {(dataVis.chart_type === 'PieChart') &&
                    <div>
                        <p>field to compare</p>
                        <select id='x_axis' onChange={handleChange}>
                            {options.map(option => {
                                return <option key={option} value={option}>{option}</option>
                            })}
                        </select>
                    </div>
                }

                {/* toggle chart legend */}
                <p>display legend</p>
                {(dataVis.legend) 
                ? <button type='button' onClick={() => setDataVis({...dataVis, legend: false})} >showing legend</button>
                : <button type='button' onClick={() => setDataVis({...dataVis, legend: true})} >legend not showing</button>
                }

                {/* submit or cancel */}
                <button type='button' onClick={handleSubmit} >submit</button>
                <button type='button' onClick={() => setShowDataVisModal(false)} >cancel</button>
            </div>
        </div>
    )
    }
}

export default DataVisModal;