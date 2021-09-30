
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { DataContext } from '../../DataContext';

function DataEntry({project}) {

    const {thisUser, URL } = useContext(DataContext);
    console.log(project);

    //defaut form includes this projects id
    //also includes this user's id
    const defaultDataEntry = {
        project: project.id,
        contributor: parseInt(thisUser.id),
        int1: null,
        int2: null,
        int3: null,
        int4: null,
        int1_label: "",
        int2_label: "",
        int3_label: "",
        int4_label: "",
        float1: null,
        float2: null,
        float3: null,
        float4: null,
        float1_label: "",
        float2_label: "",
        float3_label: "",
        float4_label: "",
        img_url: "",
        img_label: "",
        dropdown1: "",
        dropdown2: "",
        dropdown1_label: "",
        dropdown2_label: "",
        notes: "",
        lat: null,
        lon: null,
        zipcode: null
    }

    const [form, setForm] = useState(null);
    const [dataEntry, setDataEntry] = useState(defaultDataEntry)

    //splits dropdown options string into an array
    //to allow mapping through options in the data entry form 
    const getDropDownOptions = (string) => {
        return string.split(', ');
    }

    //gets labels from form data
    const getLabels = (f) => {
        let newObj = {};
        //if key includes '_label' and is not blank
        //creates a new key-value pair in 'newObj' 
        for (let key in f) {
            if (
                key.includes('_label') === true &&
                f[key] !== ''
            ) {
                newObj[key] = f[key];
            }
        }
        //if 1st dropdown is present
        //set default data entry to 1st option
        if (f.dropdown1 === true) {
            let options = getDropDownOptions(f.dropdownOptions1);
            newObj['dropdown1'] = options[0]
        }
        //if 2nd dropdown is present
        //set default data entry to 1st option
        if (f.dropdown2 === true) {
            let options = getDropDownOptions(f.dropdownOptions2);
            newObj['dropdown2'] = options[0]
        }
        //update dataEntry state with labels and default dropdown values
        setDataEntry({...dataEntry, ...newObj});
    }

    //called on page load
    //gets form data for this project
    const getForm = () => {
        let id = project.id.toString()
        const url = `${URL}/formgrab/${id}`
        axios.get(url)
            .then(res => {
                if(res.data[0]){
                    //calls form data in state
                    setForm(res.data[0]);
                    //gets labels from form data
                    getLabels(res.data[0]);
                }
            })
            .catch(console.error);
    }

    //handle change function for form fields
    const handleChange = (e) => {
        setDataEntry({...dataEntry, [e.target.id]: e.target.value})
    }

    const postEntry = () => {
        const url = `${URL}/data_entries/`
        axios.post(url, dataEntry)
            .then(res => console.log(res))
            .catch(console.error);
    }

    const addContributor = () => {
        const url = `${URL}/projects/${project.id}`;
        axios.put(url, {...project, contributor_list: [...project.contributor_list, thisUser.id]})
            .then(res => console.log(res))
            .catch(console.error);
    }

    //posts new data entry to 'data_entries'
    const handleSubmit = () => {
        postEntry();
        if (!project.contributor_list.some((cont => cont === thisUser.id))) {
            addContributor();
        }
    }

    useEffect(() => {
        getForm();
    }, [])

    //when rendering the form, it only displays fields that
    //have been set to 'true' by the admin who created the form
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
                            return <option key= {option} id='dropdown1' value={option} >{option}</option>
                        })}
                    </select>
                </div>    
            }
            {form.dropdown2 && 
                <div>
                    <p>{form.dropdown2_label}</p>
                    <select name='dropdown2' id='dropdown2' onChange={handleChange}>
                        {getDropDownOptions(form.dropdownOptions2, 'dropdown2').map(option => {
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
                <p>this project hasn't set up a form to track data yet</p>
            </div> 
        )
    }
    
}

export default DataEntry;