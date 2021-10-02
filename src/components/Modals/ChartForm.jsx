import React from 'react';

const ChartForm = ({data, options, handleChange}) => {
    console.log(options)

    if (data.chart_type==="LineChart"){
        return(

            <div>
                <p>A line chart requires two number fields to compare</p>
                <p>The chart displays the two number fields compared along the x-axis and y-axis</p>
                <p>x axis</p>

                <select className='dropdown-input' id='x_axis' defaultValue={options.x_axis[0]} onChange ={handleChange}>

                    {options.x_axis.map(option => {
                        return <option key={option} value={option}>{option}</option>
                    })}
                </select>
                <p>y axis</p>
                <select className='dropdown-input' id='y_axis' defaultValue={options.y_axis[0]} onChange={handleChange}>
                    {options.y_axis.map(option => {
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
                <select className='dropdown-input' id='y_axis' defaultValue={options.y_axis[0]} onChange={handleChange}>
                    {options.y_axis.map(option => {
                        return <option key={option} value={option}>{option}</option>
                    })}
                </select>
                <p>Bar Length</p>
                <select className='dropdown-input' id='x_axis' defaultValue={options.x_axis[0]} onChange={handleChange}>

                    {options.x_axis.map(option => {
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
            <select className='dropdown-input' id='x_axis' defaultValue={options.x_axis[0]} onChange={handleChange}>
                {options.x_axis.map(option => {
                    return <option key={option} value={option}>{option}</option>
                })}
            </select>
        </div>
        )
    }
};

export default ChartForm;