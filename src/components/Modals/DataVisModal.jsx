import axios from 'axios';
import React, { useContext, useState } from 'react';
import { DataContext } from '../../DataContext';
import './Modals.css'

function DataVisModal({p, setShowDataVisModal, procData}) {

    let options = [];

    for (let key in procData[0]) {
        if (key !== 'notes') {
                options.push(key)
            }
        } 

    const {thisUser} = useContext(DataContext);

    const defaultDataVis = {
        project: p.id,
        contributor: thisUser.id,
        chart_type: 'LineChart',
        chart_title: "",
        x_axis: options[0],
        x_axis_min: null,
        x_axis_max: null,
        y_axis: options[1],
        y_axis_min: null,
        y_axis_max: null,
        legend: false,
        pie_hole: null
    }

    const [dataVis, setDataVis] = useState(defaultDataVis);

    const handleChange = (e) => {
        setDataVis({...dataVis, [e.target.id]: e.target.value})
    }

    const handleSubmit = () => {

        const url = 'http://localhost:8000/data_vis/'
        axios.post(url, dataVis)
            .then(res => console.log(res))
            .catch(console.error);
    }

    return (
        <div className='modal-background'>
            <div className='modal-textbox'>
                <select id='chart_type' onChange={handleChange}>
                    <option value='LineChart'>Line Chart</option>
                    <option value='BarChart'>Bar Chart</option>
                    <option value='Histogram'>Histogram</option>
                    <option value='PieChart'>Pie Chart</option>
                </select>
                <p>enter chart title</p>
                <input type='text' id='chart_title' placeholder='chart title' onChange={handleChange} />
                {(dataVis.chart_type === 'LineChart') &&
                    <div>
                        <p>x axis</p>
                        <select id='x_axis' onChange={handleChange}>
                            {options.map(option => {
                                return <option key={option} value={option}>{option}</option>
                            })}
                        </select>

                        <p>x axis min</p>
                        <input type='text' id='x_axis_min' placeholder='x min' onChange={handleChange} />

                        <p>x axis max</p>
                        <input type='text' id='x_axis_max' placeholder='x max' onChange={handleChange} />

                        <p>y axis</p>
                        <select id='y_axis' onChange={handleChange}>
                            {options.map(option => {
                                return <option key={option} value={option}>{option}</option>
                            })}
                        </select>

                        <p>y axis min</p>
                        <input type='text' id='y_axis_min' placeholder='y min' onChange={handleChange} />

                        <p>y axis max</p>
                        <input type='text' id='y_axis_max' placeholder='y max' onChange={handleChange} />
                    </div>
                }
                {(dataVis.chart_type === 'Histogram') &&
                    <div>
                        <p>field to analyze</p>
                        <select id='x_axis' onChange={handleChange}>
                            {options.map(option => {
                                return <option key={option} value={option}>{option}</option>
                            })}
                        </select>

                        <p>x axis min</p>
                        <input type='text' id='x_axis_min' placeholder='x min' onChange={handleChange} />

                        <p>x axis max</p>
                        <input type='text' id='x_axis_max' placeholder='x max' onChange={handleChange} />

                        <p>frequency min</p>
                        <input type='text' id='y_axis_min' placeholder='y min' onChange={handleChange} />

                        <p>frequency max</p>
                        <input type='text' id='y_axis_max' placeholder='y max' onChange={handleChange} />
                    </div>
                }
                {(dataVis.chart_type === 'BarChart') &&
                    <div>
                        <p>x axis</p>
                        <select id='x_axis' onChange={handleChange}>
                            {options.map(option => {
                                return <option key={option} value={option}>{option}</option>
                            })}
                        </select>

                        <p>x axis min</p>
                        <input type='text' id='x_axis_min' placeholder='x min' onChange={handleChange} />

                        <p>x axis max</p>
                        <input type='text' id='x_axis_max' placeholder='x max' onChange={handleChange} />

                        <p>y axis</p>
                        <select id='y_axis' onChange={handleChange}>
                            {options.map(option => {
                                return <option key={option} value={option}>{option}</option>
                            })}
                        </select>

                        <p>y axis min</p>
                        <input type='text' id='y_axis_min' placeholder='y min' onChange={handleChange} />

                        <p>y axis max</p>
                        <input type='text' id='y_axis_max' placeholder='y max' onChange={handleChange} />
                    </div>
                }
                {(dataVis.chart_type === 'PieChart') &&
                    <div>
                        <p>field to compare</p>
                        <select id='x_axis' onChange={handleChange}>
                            {options.map(option => {
                                return <option key={option} value={option}>{option}</option>
                            })}
                        </select>
                        
                        <p>enter pie hole size</p>
                        <input type='text' id='pie_hole' placeholder='pie hole size' onChange={handleChange} />
                    </div>
                }

                <p>display legend</p>
                {(dataVis.legend) 
                ? <button type='button' onClick={() => setDataVis({...dataVis, legend: false})} >showing legend</button>
                : <button type='button' onClick={() => setDataVis({...dataVis, legend: true})} >legend not showing</button>
                }

                <button type='button' onClick={handleSubmit} >submit</button>
                <button type='button' onClick={() => setShowDataVisModal(false)} >cancel</button>
            </div>
        </div>
    );
}

export default DataVisModal;