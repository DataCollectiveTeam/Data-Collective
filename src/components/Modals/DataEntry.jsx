
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { DataContext } from '../../DataContext';

function DataEntry({project, setAddData}) {

    const {thisUser, URL } = useContext(DataContext);

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
        zipcode: ""
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
        const url = `${URL}/formgrab/${project.id}`
        axios.get(url)
            .then(res => {
                //calls form data in state
                setForm(res.data[0]);
                //gets labels from form data
                getLabels(res.data[0]);
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
            .then(res => setAddData(false))
            .catch(console.error);
    }

    const addContributor = () => {
        const url = `${URL}/projects/${project.id}`;
        axios.put(url, {...project, contributor_list: [...project.contributor_list, thisUser.id]})
    }

    //posts new data entry to 'data_entries'
    const handleSubmit = () => {
        postEntry();
        if (!project.contributor_list.some((cont => cont === parseInt(thisUser.id)))) {
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
        <div className='modal-background'>
            <div className='modal-textbox data-entry'>
                {form.int1 && 
                    <div>
                        <p>{form.int1_label}</p>
                        <input className='int-input' type='number' id='int1' placeholder='integer' onChange={handleChange} />
                    </div>    
                }
                {form.int2 && 
                    <div>
                        <p>{form.int2_label}</p>
                        <input className='int-input' type='number' id='int2' placeholder='integer' onChange={handleChange} />
                    </div>    
                }
                {form.int3 && 
                    <div>
                        <p>{form.int3_label}</p>
                        <input className='int-input' type='number' id='int3' placeholder='integer' onChange={handleChange} />
                    </div>    
                }
                {form.int4 && 
                    <div>
                        <p>{form.int4_label}</p>
                        <input className='int-input' type='number' id='int4' placeholder='integer' onChange={handleChange} />
                    </div>    
                }
                {form.float1 && 
                    <div>
                        <p>{form.float1_label}</p>
                        <input className='float-input' type='number' step='0.01' id='float1' placeholder='decimal' onChange={handleChange} />
                    </div>    
                }
                {form.float2 && 
                    <div>
                        <p>{form.float2_label}</p>
                        <input className='float-input' type='number' step='0.01' id='float2' placeholder='decimal' onChange={handleChange} />
                    </div>    
                }
                {form.float3 && 
                    <div>
                        <p>{form.float3_label}</p>
                        <input className='float-input' type='number' step='0.01' id='float3' placeholder='decimal' onChange={handleChange} />
                    </div>    
                }
                {form.float4 && 
                    <div>
                        <p>{form.float4_label}</p>
                        <input className='float-input' type='number' step='0.01' id='float4' placeholder='decimal' onChange={handleChange} />
                    </div>    
                }
                {form.dropdown1 && 
                    <div>
                        <p>{form.dropdown1_label}</p>
                        <select className='dropdown-input' name='dropdown1' id='dropdown1' onChange={handleChange}>
                            {getDropDownOptions(form.dropdownOptions1).map(option => {
                                return <option key= {option} id='dropdown1' value={option} >{option}</option>
                            })}
                        </select>
                    </div>    
                }
                {form.dropdown2 && 
                    <div>
                        <p>{form.dropdown2_label}</p>
                        <select className='dropdown-input' name='dropdown2' id='dropdown2' onChange={handleChange}>
                            {getDropDownOptions(form.dropdownOptions2, 'dropdown2').map(option => {
                                return <option key= {option} id='dropdown2' value={option} >{option}</option>
                            })}
                        </select>
                    </div>    
                }
                {form.img_url && 
                    <div>
                        <p>{form.img_url}</p>
                        <input className='img-url-input' type='text' id='img_url' placeholder='image url' onChange={handleChange} />
                    </div>    
                }
                {form.notes && 
                    <div>
                        <textarea className='notes-input' id='notes' rows='5' placeholder='enter notes here' onChange={handleChange}></textarea>
                    </div>
                }
                {form.latlon && 
                    <div>
                        <p>enter coordinates</p>
                        <input className='lat-lon-input' type='number' id='lat' placeholder='latitude' onChange={handleChange} />
                        <input className='lat-lon-input' type='number' id='lon' placeholder='longitude' onChange={handleChange} />
                    </div>    
                }
                {form.zipcode &&
                    <div>
                        <p>enter zipcode</p>
                        <input className='zipcode-input' type='text' id='zipcode' placeholder='zipcode' onChange={handleChange} />
                    </div>
                }
                <div>
                    <button className='data-submit-button' type='button' onClick={handleSubmit}><i class="fas fa-plus"></i></button>
                    <button className='close-modal-button' type='button' onClick={() => setAddData(false)} ><i class="fas fa-times"></i></button> 
                </div>
                
            </div>
        </div>
        );
    } else {
        return (
            <div className='modal-background'>
                <div className='modal-textbox no-form-yet'>
                    <p>this project hasn't set up a form to track data yet</p>
                    <p>make a post in the discussion tab letting the admins know you want to contribute</p>
                    <button className='data-submit-button' type='button' onClick={() => setAddData(false)} ><i class="fas fa-check"></i></button>
                </div>
                
            </div> 
        )
    }
    
}

export default DataEntry;