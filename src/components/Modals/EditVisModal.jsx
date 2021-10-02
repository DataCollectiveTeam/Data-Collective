import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import { DataContext } from '../../DataContext';
import ChartForm from './ChartForm';
import './Modals.css'


function EditVisModal({item, procData, p, setShowEditVisModal, dataVisChange, setDataVisChange}) {

    //import the current user and backend url from datacontext
    const {thisUser, URL} = useContext(DataContext);

    //default state of datavis form
    const defaultDataVis = {
        project: p.id,
        contributor: thisUser.id,
        chart_type: '',
        chart_title: 'new',
        x_axis: '',
        y_axis: '',
        legend: false,
        pie_hole: null
    }

    //default array of options for dropdown menus
    const defaultOptions = {
        x_axis: [],
        y_axis: []
    }
    
    //store datavis form in state
    const [dataVis, setDataVis] = useState(defaultDataVis)
    const [dataSample, setDataSample] = useState(null)
    const [chartList, setChartList] = useState([])
    const [options, setOptions] = useState(defaultOptions)

    //set chart type and populate relevant dropdown menu options
    function setChartType(type, data) {
        let x = []
        let y = []
        
        if (type==='LineChart'){
            for (let key in data) {
            if ((typeof data[key])==="number") {
                x.push(key)
            }
            if ((typeof data[key])==="number") {
                y.push(key)
            } 
            }
        } else if (type==='BarChart'){
            for (let key in data) {
            if ((typeof data[key])==="number") {
                x.push(key)
                y.push(key)
            }
            if ((typeof data[key])==="string") {
                y.push(key)
            }
            }
        } else if (type==='PieChart'){
            for (let key in data) {
            if ((typeof data[key])==="string") {
                    x.push(key)
                }
            }
        }
        console.log(x,y)
        setOptions({x_axis: x, y_axis: y})
        setDataVis({...dataVis, chart_type: type, x_axis: x[0], y_axis: y[0]})
    }

    useEffect(() => {
        const url = `${URL}/data_vis/${item.id}`;
        axios.get(url)
            .then(res => setDataVis(res.data))
            .catch(console.error);
        
        //remove id, contributor, and notes from data keys
        let sample = {}
        for (let key in procData[0]){
            if (key !== 'id' && key !== 'contributor' && key!=="notes"){
                sample[key] = procData[0][key]
            }
        }
        //store remaining keys in state
        setDataSample(sample)

        //count number and string data types in project data
        let numbers=0
        let strings=0
        let charts = []
        for (let key in sample){
            if ((typeof sample[key])==="number") {
                numbers+=1
            } 
            if ((typeof sample[key])==="string") {
                strings+=1
            }
        }
        //only allow creation of charts with relevant data available
        if (numbers>1){
            charts.push("LineChart")
        }
        if (strings>0){
            charts.push("PieChart")
        }
        if (numbers>0&& strings>0){
            charts.push("BarChart")
        }
        //store list of valid charts in state
        setChartList(charts)
        setChartType(charts[0], sample)
        
        }, [])
    
    const updateChartType = (e) => {
        setChartType(e.target.value, dataSample)
    }
    
    //update properties of datavis state object
    const handleChange = (e) => {
        setDataVis({...dataVis, [e.target.id]: e.target.value})
        console.log(dataVis)
    }

    //put datavis to db
    const handleSubmit = () => {
        const url = `${URL}/data_vis/${item.id}`
        axios.put(url, dataVis)
            .then(res => setDataVisChange(!dataVisChange))
            .catch(console.error);
        setShowEditVisModal(false);
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
                <select className='dropdown-input' id='chart_type' value={dataVis.chart_type} onChange={updateChartType}>
                    {chartList.map(item => {
                        return <option key={item} value={item}>{item}</option>
                    })}
                </select>

                {/* enter chart title */}
                <p>enter chart title</p>
                <input className='chart-title-input' type='text' id='chart_title' placeholder='chart title' value={dataVis.chart_title} onChange={handleChange} />

                {/* generate form by chart type */}
                {dataVis.chart_type &&
                <ChartForm data={dataVis} options={options} handleChange={handleChange}/>
                }
                {/* toggle chart legend */}
                <p>toggle legend</p>
                {(dataVis.legend) 
                ? <button className='legend-toggle-button' type='button' onClick={() => setDataVis({...dataVis, legend: false})} >showing legend</button>
                : <button className='legend-toggle-button' type='button' onClick={() => setDataVis({...dataVis, legend: true})} >legend not showing</button>
                }

                {/* submit or cancel */}
                <div>
                    <button className='submit-vis-button' type='button' onClick={handleSubmit} ><i class="fas fa-check"></i></button>
                    <button className='close-modal-button' type='button' onClick={() => setShowEditVisModal(false)} ><i class="fas fa-times"></i></button>
                </div>
                 </div>
        </div>
    )
    }
}

export default EditVisModal;