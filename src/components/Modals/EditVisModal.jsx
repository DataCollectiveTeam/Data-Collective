import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import { DataContext } from '../../DataContext';


function EditVisModal({item, procData, p, setShowEditVisModal, dataVisChange, setDataVisChange}) {

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

    //put datavis edits to db
    const handleSubmit = () => {
        const url = `${URL}/data_vis/${item.id}`
        axios.put(url, dataVis)
            .then(res => setDataVisChange(!dataVisChange))
            .catch(console.error);
        setShowEditVisModal(false);
    }

    useEffect(() => {
        const url = `${URL}/data_vis/${item.id}`;
        axios.get(url)
            .then(res => setDataVis(res.data))
            .catch(console.error);
    }, [])

    return (
        <div className='modal-background'>
            <div className='modal-textbox'>
                <select id='chart_type' value={dataVis.chart_type} onChange={handleChange}>
                    <option value='LineChart'>Line Chart</option>
                    <option value='BarChart'>Bar Chart</option>
                    <option value='Histogram'>Histogram</option>
                    <option value='PieChart'>Pie Chart</option>
                </select>
                <p>enter chart title</p>
                <input type='text' id='chart_title' placeholder='chart title'  value={dataVis.chart_title} onChange={handleChange} />
                {(dataVis.chart_type === 'LineChart') &&
                    <div>
                        <p>x axis</p>
                        <select id='x_axis' onChange={handleChange} value={dataVis.x_axis}>
                            {options.map(option => {
                                return <option key={option} value={option}>{option}</option>
                            })}
                        </select>

                        <p>y axis</p>
                        <select id='y_axis' onChange={handleChange} value={dataVis.y_axis}>
                            {options.map(option => {
                                return <option key={option} value={option}>{option}</option>
                            })}
                        </select>
                    </div>
                }
                {(dataVis.chart_type === 'Histogram') &&
                    <div>
                        <p>field to analyze</p>
                        <select id='x_axis' onChange={handleChange} value={dataVis.x_axis}>
                            {options.map(option => {
                                return <option key={option} value={option}>{option}</option>
                            })}
                        </select>
                    </div>
                }
                {(dataVis.chart_type === 'BarChart') &&
                    <div>
                        <p>x axis</p>
                        <select id='x_axis' value={dataVis.x_axis} onChange={handleChange}>
                            {options.map(option => {
                                return <option key={option} value={option}>{option}</option>
                            })}
                        </select>
                        <p>y axis</p>
                        <select id='y_axis' value={dataVis.y_axis} onChange={handleChange}>
                            {options.map(option => {
                                return <option key={option} value={option}>{option}</option>
                            })}
                        </select>
                    </div>
                }
                {(dataVis.chart_type === 'PieChart') &&
                    <div>
                        <p>field to compare</p>
                        <select id='x_axis' value={dataVis.x_axis} onChange={handleChange}>
                            {options.map(option => {
                                return <option key={option} value={option}>{option}</option>
                            })}
                        </select>
                        
                        <p>enter pie hole size</p>
                        <input type='text' id='pie_hole' placeholder='pie hole size' value={dataVis.pie_hole} onChange={handleChange} />
                    </div>
                }
                

                <p>display legend</p>
                {(dataVis.legend) 
                ? <button type='button' onClick={() => setDataVis({...dataVis, legend: false})} >showing legend</button>
                : <button type='button' onClick={() => setDataVis({...dataVis, legend: true})} >legend not showing</button>
                }

                <button type='button' onClick={handleSubmit} >submit</button>
                <button type='button' onClick={() => setShowEditVisModal(false)} >cancel</button>
            </div>
        </div>
    );
}

export default EditVisModal;