import React from 'react';

const ChartForm = ({type, options, handleChange}) => {

    if (type==="LineChart"){
        return(

            <div>
                <p>A line chart requires two number fields to compare</p>
                <p>The chart displays the two number fields compared along the x-axis and y-axis</p>
                <p>x axis</p>
                <select id='x_axis' onChange={handleChange}>
                    {options.field1.map(option => {
                        return <option key={option} value={option}>{option}</option>
                    })}
                </select>
                <p>y axis</p>
                <select id='y_axis' onChange={handleChange}>
                    {options.field2.map(option => {
                        return <option key={option} value={option}>{option}</option>
                    })}
                </select>
            </div>
        )
    } else if (type==="BarChart"){
        return(
            <div>
                <p>A bar chart requires one text field and one number field</p>
                <p>The chart displays the value of the number field categorized by the selected text field</p>
            <select id='y_axis' onChange={handleChange}>
                {options.field1.map(option => {
                    return <option key={option} value={option}>{option}</option>
                })}
            </select>
            <select id='x_axis' onChange={handleChange}>
                {options.field2.map(option => {
                    return <option key={option} value={option}>{option}</option>
                })}
            </select>
        </div>
        )
    } else if (type==="Histogram"){
        return(
            <div>
                <p>A histogram requires one number field</p>
                <p>The chart displays the frequency of each value of that number field</p>
                <select id='x_axis' onChange={handleChange}>
                    {options.field1.map(option => {
                        return <option key={option} value={option}>{option}</option>
                    })}
                </select>
            </div>
        )
    } else if (type==="PieChart"){
        return(
        <div>
            <p>A pie chart requires one text field</p>
            <p>The chart displays the frequency of each value of that text field</p>
            <select id='x_axis' onChange={handleChange}>
                {options.field1.map(option => {
                    return <option key={option} value={option}>{option}</option>
                })}
            </select>
        </div>
        )
    }
};

export default ChartForm;