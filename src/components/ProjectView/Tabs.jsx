import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../../DataContext';
import AdminPanel from './AdminPanel';
import DataEntry from '../Modals/DataEntry';
import DataVis from './DataVis';
import Discussion from './Discussion';
import RawData from './RawData';
import TabDescription from './TabDescription';

function Tabs({project, data, showNewForm, setShowNewForm, addData, setAddData, dataDeleted, setDataDeleted, projectReload, setProjectReload}) {


    const {thisUser} = useContext(DataContext);

    //sets default tab display to description
    const defaultTabState = 'desc';

    const [tabState, setTabState] = useState(defaultTabState);
    const [procData, setProcData] = useState(null);

    //regexs to check for when processing data
    let labelRegEx = '_label';
    let optionsRegEx = 'Options';

    const processData = () => {
        let processedData = [];
        //for each data entry
        data.forEach(entry => {
        let validData = {};
        //check which data fields are used
        for (let key in entry) {
            if (key !== 'id' &&
                key !== 'project' &&
                key !== 'contributor' &&
                key.match(labelRegEx) === null &&
                key.match(optionsRegEx) === null &&
                entry[key] !== null &&
                entry[key] !== ''
            ) { 
                //of valid fields...
                //if 'lat', pass in value as 'latitude'
                if (key === 'lat') {
                    validData['latitude'] = entry[key];
                //if 'lon', pass in value as 'longitude'
                } else if (key === 'lon') {
                    validData['longitude'] = entry[key];
                //for everything else
                //except zipcode and notes
                } else if (
                    key !== 'notes' &&
                    key !== 'zipcode' 
                    ) {
                        //pass in a key value pair with the label as key
                        //and the data as value
                        let label = `${key}_label`;
                        validData[entry[label]] = entry[key];
                //for notes and zipcode
                //pass them in as normal
                } else {
                    validData[key] = entry[key];
                }  
            }
        }

        //pass in the id and contributor to each processed data point 
        validData['id'] = entry.id;
        validData['contributor'] = entry.contributor;
        //push the processed data point into the processed data array
        processedData.push(validData);
        })

    //after each data point has been processed
    //pass the array of processed data to the 'procData' state
    //to be used in the raw data an data visualization tab
    setProcData(processedData)

    }

    const tabClick = (e) => {
        let buttons = document.getElementsByClassName('tab-button');
        let tabButtons = [...buttons];
        tabButtons.forEach(button => {
            button.classList.remove('reg-selected');
        })
        let adminButton = document.getElementById('admin');
        if (adminButton !== null) {
            adminButton.classList.remove('admin-selected');
        }
        let clickedId = e.target.id;
        let clicked = document.getElementById(clickedId);
        if (clickedId === 'admin') {
            clicked.classList.add('admin-selected');
            setTabState(clickedId)
        } else {
            clicked.classList.add('reg-selected');
            setTabState(clickedId)
        }
    }   

    useEffect(() => {
        processData();
    }, [data])

    return (
        <div className='Tabs'>
            {(addData) && 
                <DataEntry project={project} setAddData={setAddData}/>
            }
            <div className='tab-buttons' id='tab-buttons'>
                <button className='tab-button reg-selected' id='desc' type='button' onClick={tabClick}>description</button>
                <button className='tab-button' id='disc' type='button' onClick={tabClick}>discussion</button>
                <button className='tab-button' id='raw_data' type='button' onClick={tabClick}>view data</button>
                <button className='tab-button' id='data_vis' type='button' onClick={tabClick}>data visulaization</button>
                {thisUser && (project.admin_list.some(admin => admin === parseInt(thisUser.id))) && 
                    <button className='admin-button' id='admin' type='button' onClick={tabClick}>admin</button>
                }
            </div>
            <select className='tabs-dropdown' onChange={(e) => setTabState(e.target.value)} >
                <option id='desc' value='desc' >description</option>
                <option id='disc' value='disc' >discussion</option>
                <option id='raw_data' value='raw_data' >view data</option>
                <option id='data_vis' value='data_vis' >data visulaization</option>
                {thisUser && (project.admin_list.some(admin => admin === parseInt(thisUser.id))) &&
                    <option id='admin' value='admin' >admin</option>
                }
            </select>
            <div className='tab-viewer'>
                {(tabState === 'desc') && 
                    <TabDescription project={project} />
                }
                {(tabState === 'disc') &&
                    <Discussion project={project} admins={project.admin_list} />
                }
                {(tabState === 'raw_data') && 
                    <RawData procData={procData} creator={project.creator} admins={project.admin_list} setAddData={setAddData} dataDeleted={dataDeleted} setDataDeleted={setDataDeleted} />
                }
                {(tabState === 'data_vis') && 
                    <DataVis procData={procData} project={project} />
                }
                {(tabState === 'admin') && 
                    <AdminPanel p={project} showNewForm={showNewForm} setShowNewForm={setShowNewForm} procData={procData} projectReload={projectReload} setProjectReload={setProjectReload}/>
                }
            </div>
            
            
        </div>
    );
}

export default Tabs;