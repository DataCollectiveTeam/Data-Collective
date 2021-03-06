import axios from 'axios';
import React, { useContext, useState } from 'react';
import { DataContext } from '../../DataContext';
import './Modals.css';

function NewFormModal({setShowNewForm, thisProject}) {

    const { thisUser, URL } = useContext(DataContext);

    //each form is defaulted to have the project id for this project
    //and the user id of the admin who created it
    //the current date is also passed in when the form is submitted
    let newFormDefault = {
        "project": parseInt(thisProject),
        "creator": thisUser.id,
        "int1": false,
        "int2": false,
        "int3": false,
        "int4": false,
        "int1_label": "",
        "int2_label": "",
        "int3_label": "",
        "int4_label": "",
        "float1": false,
        "float2": false,
        "float3": false,
        "float4": false,
        "float1_label": "",
        "float2_label": "",
        "float3_label": "",
        "float4_label": "",
        "img_url": false,
        "img_label": "",
        "dropdown1": false,
        "dropdown2": false,
        "dropdown1_label": "",
        "dropdown2_label": "",
        "dropdownOptions1": "",
        "dropdownOptions2": "",
        "notes": false,
        "latlon": false,
        "zipcode": false,
        "date_created": new Date()
    }

    const [formState, setFormState] = useState(newFormDefault);

    const handleClick = (e) => {
        setFormState({...formState, [e.target.id]: !formState[e.target.id]});
    }

    const handleChange = (e) => {
        setFormState({...formState, [e.target.id]: e.target.value});
    }

    //posts formState to the form database
    const handleSubmit = () => {
        setShowNewForm(false);
        const url = `${URL}/forms/`;
        axios.post(url, formState)
            .catch(console.error);
    }

    //each button sets the corresponding boolean in the formState to True
    //for fields of the same type, each button is only displayed
    //when the field before it is true
    //for example: only one 'add int' button is visible 
    //until the form creator decides to add an int
    //at that point, the button to add a second int also becomes available
    //this happens for ints, floats, and dropdowns
    //
    //whenever you decided to add a field, you have the ability to add a label to the field
    //except for 'notes', 'zipcode', and 'latitude and longitude'
    return (
        <div className='modal-background'>
            <div className='modal-textbox form-modal'>
                <button className='add-button' type='button' id='int1' onClick={handleClick}>add integer</button>
                {(formState.int1 === true) &&
                    <div>
                        <input className='int-input' type='text' id='int1_label' placeholder='label for first integer field' onChange={handleChange} />
                        <div>
                            <button className='add-button' type='button' id='int1' onClick={handleClick}>remove this integer</button>
                            <button className='add-button' type='button' id='int2' onClick={handleClick}>add another integer</button>
                        </div>
                        
                    </div>
                }
                {(formState.int2 === true) &&
                    <div>
                        <input className='int-input' type='text' id='int2_label' placeholder='label for second integer field' onChange={handleChange} />
                        <div>
                            <button className='add-button' type='button' id='int2' onClick={handleClick}>remove this integer</button>
                            <button className='add-button' type='button' id='int3' onClick={handleClick}>add another integer</button>
                        </div>
                    </div>
                }
                {(formState.int3 === true) &&
                    <div>
                        <input className='int-input' type='text' id='int3_label' placeholder='label for third integer field' onChange={handleChange} />
                        <div>
                            <button className='add-button' type='button' id='int3' onClick={handleClick}>remove this integer</button>
                            <button className='add-button' type='button' id='int4' onClick={handleClick}>add another integer</button>
                        </div>
                    </div>
                }
                {(formState.int4 === true) &&
                    <div>
                        <input className='int-input' type='text' id='int4_label' placeholder='label for fourth integer field' onChange={handleChange} />
                        <div>
                            <button className='add-button' type='button' id='int4' onClick={handleClick}>remove this integer</button>
                        </div>
                    </div>    
                }
                <button className='add-button' type='button' id='float1' onClick={handleClick} >add decimal</button>
                {(formState.float1 === true) &&
                    <div>
                        <input className='int-input' type='text' id='float1_label' placeholder='label for first decimal field' onChange={handleChange} />
                        <div>
                            <button className='add-button' type='button' id='float1' onClick={handleClick}>remove this decimal</button>
                            <button className='add-button' type='button' id='float2' onClick={handleClick}>add another decimal</button>
                        </div>
                    </div>
                }
                {(formState.float2 === true) &&
                    <div>
                        <input type='text' id='float2_label' placeholder='label for second decimal field' onChange={handleChange} />
                        <div>
                            <button className='add-button' type='button' id='float2' onClick={handleClick}>remove this decimal</button>
                            <button className='add-button' type='button' id='float3' onClick={handleClick}>add another decimal</button>
                        </div>
                    </div>
                }
                {(formState.float3 === true) &&
                    <div>
                        <input className='int-input' type='text' id='float3_label' placeholder='label for third decimal field' onChange={handleChange} />
                        <div>
                            <button className='add-button' type='button' id='float3' onClick={handleClick}>remove this decimal</button>
                            <button className='add-button' type='button' id='float4' onClick={handleClick}>add another decimal</button>
                        </div>
                    </div>
                }
                {(formState.float4 === true) &&
                    <div>
                        <input className='int-input' type='text' id='float4_label' placeholder='label for fourth decimal field' onChange={handleChange} />
                        <div>
                            <button className='add-button' type='button' id='float4' onClick={handleClick}>remove this decimal</button>
                        </div>
                    </div>
                }
                <button className='add-button' type='button' id='dropdown1' onClick={handleClick} >add dropdown menu</button>
                {(formState.dropdown1 === true) &&
                    <div>
                        <input className='int-input' type='text' id='dropdown1_label' placeholder='label for first dropdown field' onChange={handleChange} />
                        <p>enter the options for the first dropdown seperated by a comma and a space</p>
                        <p>there is no limit to the amount of dropdown options</p>
                        <input className='int-input' type='text' id='dropdownOptions1' placeholder='e.g. option1, option2, option3, option4' onChange={handleChange} />
                        <div>
                            <button className='add-button' type='button' id='dropdown1' onClick={handleClick}>remove this dropdown</button>
                            <button className='add-button' type='button' id='dropdown2' onClick={handleClick}>add another dropdown</button>
                        </div>
                    </div>
                }
                {(formState.dropdown2 === true) &&
                    <div>
                        <input className='int-input' type='text' id='dropdown2_label' placeholder='label for second dropdown field' onChange={handleChange} />
                        <p>enter the options for the second dropdown seperated by a comma and a space</p>
                        <p>there is no limit to the amount of dropdown options</p>
                        <input className='int-input' type='text' id='dropdownOptions2' placeholder='e.g. option1, option2, option3, option4' onChange={handleChange} />
                        <div>
                            <button className='add-button' type='button' id='dropdown2' onClick={handleClick}>remove this dropdown</button>
                        </div>
                    </div>
                }
                <button className='add-button' type='button' id='img_url' onClick={handleClick} >add image url field</button>
                {(formState.img_url === true) &&
                    <div>
                        <input className='int-input' type='text' id='img_label' placeholder='label for image url field' onChange={handleChange} />
                        <button className='add-button' type='button' id='img_url' onClick={handleClick} >remove image url field</button>
                    </div>
                }
                {(formState.notes)
                ? <button className='add-button' type='button' id='notes' onClick={handleClick} >remove notes field</button>
                : <button className='add-button' type='button' id='notes' onClick={handleClick} >add notes field</button>
                }
                {(formState.latlon)
                ? <button className='add-button long' type='button' id='latlon' onClick={handleClick} >remove latitude and longitude entry</button>
                : <button className='add-button long' type='button' id='latlon' onClick={handleClick} >add latitude and longitude entry</button>
                }
                {(formState.zipcode)
                ? <button className='add-button' type='button' id='zipcode' onClick={handleClick} >remove zipcode entry</button> 
                : <button className='add-button' type='button' id='zipcode' onClick={handleClick} >add zipcode entry</button>  
                } 
                <div>
                    <button className='submit-new-form-button' type='button' onClick={handleSubmit} ><i class="fas fa-check"></i></button>       
                    <button className='close-modal-button' type='button' onClick={() => setShowNewForm(false)}><i class="fas fa-times"></i></button> 
                </div>
                
            </div>
        </div>
    );
}

export default NewFormModal;