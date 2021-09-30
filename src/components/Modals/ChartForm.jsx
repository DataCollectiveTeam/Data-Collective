import React from 'react';

const ChartForm = ({data, options, handleChange}) => {
    console.log(options)

    if (data.chart_type==="LineChart"){
        return(

            <div>
                <p>A line chart requires two number fields to compare</p>
                <p>The chart displays the two number fields compared along the x-axis and y-axis</p>
                <p>x axis</p>
                <select id='x_axis' value={data.x_axis} onChange ={handleChange}>
                    {options.field1.map(option => {
                        return <option key={option} value={option}>{option}</option>
                    })}
                </select>
                <p>y axis</p>
                <select id='y_axis' value={data.y_axis} onChange={handleChange}>
                    {options.field2.map(option => {
                        return <option key={option} value={option}>{option}</option>
                    })}
                </select>
            </div>
        )
    } else if (data.chart_type==="BarChart"){
        return(
            <div>
                <p>A bar chart requires one text field and one number field</p>
                <p>The chart displays the value of the number field categorized by the selected text field</p>
            <p>Bar Category</p>
            <select id='y_axis' value={data.y_axis} onChange={handleChange}>
                {options.field1.map(option => {
                    return <option key={option} value={option}>{option}</option>
                })}
            </select>
            <p>Bar Length</p>
            <select id='x_axis' value={data.x_axis} onChange={handleChange}>
                {options.field2.map(option => {
                    return <option key={option} value={option}>{option}</option>
                })}
            </select>
        </div>
        )
    } else if (data.chart_type==="Histogram"){
        return(
            <div>
                <p>A histogram requires one number field</p>
                <p>The chart displays the frequency of each value of that number field</p>
                <select id='x_axis' value={data.x_axis} onChange={handleChange}>
                    {options.field1.map(option => {
                        return <option key={option} value={option}>{option}</option>
                    })}
                </select>
            </div>
        )
    } else if (data.chart_type==="PieChart"){
        return(
        <div>
            <p>A pie chart requires one text field</p>
            <p>The chart displays the frequency of each value of that text field</p>
            <select id='x_axis' value={data.x_axis} onChange={handleChange}>
                {options.field1.map(option => {
                    return <option key={option} value={option}>{option}</option>
                })}
            </select>
        </div>
        )
    }
};

export default ChartForm;