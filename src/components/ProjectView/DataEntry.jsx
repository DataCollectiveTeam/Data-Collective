
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { DataContext } from '../../DataContext';

function DataEntry({project}) {

    const {thisUser} = useContext(DataContext);

    const defaultDataEntry = {
        project: project.id,
        contributor: parseInt(thisUser.id),
        int1: null,
        int2: null,
        int3: null,
        int4: null,
        float1: null,
        float2: null,
        float3: null,
        float4: null,
        img_url: "",
        dropdown1: "",
        dropdown2: "",
        notes: "",
        lat: null,
        lon: null,
        zipcode: null
    }

    const [form, setForm] = useState(null);
    const [dataEntry, setDataEntry] = useState(defaultDataEntry)

    const getForm = () => {
        const url = `http://localhost:8000/formgrab/${project.id}`
        axios.get(url)
            .then(res => {
                setForm(res.data[0]);
            })
            .catch(console.error);
    }

    const handleChange = (e) => {
        setDataEntry({...dataEntry, [e.target.id]: e.target.value})
    }

    const getDropDownOptions = (string) => {
        return string.split(', ');
    }

    const handleSubmit = () => {
        console.log(dataEntry);
    }
    


    useEffect(() => {
        getForm();
    }, [])

    if (form) {
        return (
        <div className='DataEntry'>
            {form.int1 && 
                <div>
                    <p>{form.int1_label}</p>
                    <input type='text' id='int1' placeholder='integer' onChange={handleChange} />
                </div>    
            }
            {form.int2 && 
                <div>
                    <p>{form.int2_label}</p>
                    <input type='text' id='int2' placeholder='integer' onChange={handleChange} />
                </div>    
            }
            {form.int3 && 
                <div>
                    <p>{form.int3_label}</p>
                    <input type='text' id='int3' placeholder='integer' onChange={handleChange} />
                </div>    
            }
            {form.int4 && 
                <div>
                    <p>{form.int4_label}</p>
                    <input type='text' id='int4' placeholder='integer' onChange={handleChange} />
                </div>    
            }
            {form.float1 && 
                <div>
                    <p>{form.float1_label}</p>
                    <input type='text' id='float1' placeholder='integer' onChange={handleChange} />
                </div>    
            }
            {form.float2 && 
                <div>
                    <p>{form.float2_label}</p>
                    <input type='text' id='float2' placeholder='integer' onChange={handleChange} />
                </div>    
            }
            {form.float3 && 
                <div>
                    <p>{form.float3_label}</p>
                    <input type='text' id='float3' placeholder='integer' onChange={handleChange} />
                </div>    
            }
            {form.float4 && 
                <div>
                    <p>{form.float4_label}</p>
                    <input type='text' id='float4' placeholder='integer' onChange={handleChange} />
                </div>    
            }
            {form.dropdown1 && 
                <div>
                    <p>{form.dropdown1_label}</p>
                    <select name='dropdown1' id='dropdown1' onChange={handleChange}>
                        {getDropDownOptions(form.dropdownOptions1).map(option => {
                            return <option key= {option} id='dropdown1' value={option}>{option}</option>
                        })}
                    </select>
                </div>    
            }
            {form.dropdown2 && 
                <div>
                    <p>{form.dropdown2_label}</p>
                    <select name='dropdown2' id='dropdown2' onChange={handleChange}>
                        {getDropDownOptions(form.dropdownOptions2).map(option => {
                            return <option key= {option} id='dropdown2' value={option} >{option}</option>
                        })}
                    </select>
                </div>    
            }
            {form.img_url && 
                <div>
                    <p>{form.img_url}</p>
                    <input type='text' id='img_url' placeholder='image url' onChange={handleChange} />
                </div>    
            }
            {form.notes && 
                <div>
                    <textarea id='notes' placeholder='enter notes here' onChange={handleChange}></textarea>
                </div>
            }
            {form.latlon && 
                <div>
                    <p>enter coordinates</p>
                    <input type='text' id='lat' placeholder='latitude' onChange={handleChange} />
                    <input type='text' id='lon' placeholder='longitude' onChange={handleChange} />
                </div>    
            }
            {form.zipcode &&
                <div>
                    <p>enter zipcode</p>
                    <input type='text' id='zipcode' placeholder='zipcode' onChange={handleChange} />
                </div>
            }
            <button type='button' onClick={handleSubmit}>submit</button>
        </div>
        );
    } else {
        return (
            <div className='DataEntry'>
                <p>loading...</p>
            </div> 
        )
    }
    
}

export default DataEntry;