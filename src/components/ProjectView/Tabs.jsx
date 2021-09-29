import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../../DataContext';
import AdminPanel from './AdminPanel';
import DataEntry from './DataEntry';
import DataVis from './DataVis';
import Discussion from './Discussion';
import RawData from './RawData';
import TabDescription from './TabDescription';

function Tabs({project, data, setShowNewForm, addData, setAddData, dataDeleted, setDataDeleted}) {


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

    useEffect(() => {
        processData();
    }, [data])

    return (
        <div className='Tabs'>
            {(addData) && 
                <DataEntry project={project} setAddData={setAddData}/>
            }
            <div className='buttons'>
                <button type='button' onClick={() => setTabState('desc')}>description</button>
                <button type='button' onClick={() => setTabState('disc')}>discussion</button>
                <button type='button' onClick={() => setTabState('raw_data')}>view data</button>
                <button type='button' onClick={() => setTabState('data_vis')}>data visulaization</button>
                {thisUser && (project.admin_list.some(admin => admin === parseInt(thisUser.id))) && 
                    <button type='button' onClick={() => setTabState('admin')}>admin</button>
                }
            </div>
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
                    <AdminPanel p={project} setShowNewForm={setShowNewForm} procData={procData}/>
                }
            </div>
            
            
        </div>
    );
}

export default Tabs;