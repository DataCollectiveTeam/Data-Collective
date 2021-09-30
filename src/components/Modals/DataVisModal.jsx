import axios from 'axios';
import React, { useContext, useState } from 'react';
import { DataContext } from '../../DataContext';
import ChartForm from './ChartForm';
import './Modals.css'

function DataVisModal({p, setShowDataVisModal, procData}) {
    
    //import the current user and backend url from datacontext
    const {thisUser, URL} = useContext(DataContext);

    //create an array to store the options for x/y values
    const dataSample ={}
    for (let key in procData[0]){
        if (key !== 'id' && key !== 'contributor' && key!=="notes"){
            dataSample[key] = procData[0][key]
        }
    }

    //default state of datavis form
    const defaultDataVis = {
        project: p.id,
        contributor: thisUser.id,
        chart_type: 'LineChart',
        chart_title: 'new',
        x_axis: '',
        y_axis: '',
        legend: false,
        pie_hole: null
    }

    //default array of options for dropdown menus
    const defaultOptions = {
        field1: [],
        field2: []
    }
    
    //store datavis form in state
    const [dataVis, setDataVis] = useState(defaultDataVis)
    const [options, setOptions] = useState(defaultOptions)

    //set chart type and populate relevant dropdown menu options
    const setChartType = (e) => {
        let options_1 = []
        let options_2 = []

        let type = e.target.value
        setDataVis({...dataVis, chart_type: e.target.value})
        
        if (type==='LineChart'){
            for (let key in dataSample) {
            if ((typeof dataSample[key])==="number") {
                options_1.push(key)
            }
            if ((typeof dataSample[key])==="number") {
                options_2.push(key)
            } 
            }
        } else if (type==='BarChart'){
            for (let key in dataSample) {
            if ((typeof dataSample[key])==="string") {
                options_1.push(key)
            }
            if ((typeof dataSample[key])==="number") {
                options_2.push(key)
            }
            }
        } else if (type==='Histogram'){
            for (let key in dataSample) {
                if ((typeof dataSample[key])==="number") {
                    options_1.push(key)
                }
            }
        } else if (type==='PieChart'){
            for (let key in dataSample) {
            if ((typeof dataSample[key])==="string") {
                    options_1.push(key)
                }
            }
        }
        setOptions({field1: options_1, field2: options_2})
    }

    //update properties of datavis state object
    const handleChange = (e) => {
        setDataVis({...dataVis, [e.target.id]: e.target.value})
        console.log(dataVis)
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
                <select id='chart_type' onChange={setChartType}>
                    <option value='LineChart'>Line Chart</option>
                    <option value='BarChart'>Bar Chart</option>
                    <option value='Histogram'>Histogram</option>
                    <option value='PieChart'>Pie Chart</option>
                </select>

                {/* enter chart title */}
                <p>enter chart title</p>
                <input type='text' id='chart_title' placeholder='chart title' onChange={handleChange} />

                {/* generate form by chart type */}
                <ChartForm type={dataVis.chart_type} options={options} handleChange={handleChange}/>

                {/* toggle chart legend */}
                <p>toggle legend</p>
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