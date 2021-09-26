import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../../DataContext';
import AdminPanel from './AdminPanel';
import DataEntry from './DataEntry';
import DataVis from './DataVis';
import RawData from './RawData';
import TabDescription from './TabDescription';

function Tabs({project, data, setShowNewForm}) {


    const {thisUser} = useContext(DataContext);

    const defaultTabState = 'desc';
    

    const [tabState, setTabState] = useState(defaultTabState);
    const [procData, setProcData] = useState(null);

    let labelRegEx = '_label';
    let optionsRegEx = 'Options';

    let processedData = [];

    const processData = () => {
        data.forEach(entry => {
        let validData = {};
        for (let key in entry) {
            if (key !== 'id' &&
                key !== 'project' &&
                key !== 'contributor' &&
                key.match(labelRegEx) === null &&
                key.match(optionsRegEx) === null &&
                entry[key] !== null &&
                entry[key] !== ''
            ) { 
                if (key === 'lat') {
                    validData['latitude'] = entry[key];
                } else if (key === 'lon') {
                    validData['longitude'] = entry[key];
                } else if (
                    key !== 'notes' &&
                    key !== 'zipcode' 
                    ) {
                        let label = `${key}_label`;
                        validData[entry[label]] = entry[key];
                } else {
                    validData[key] = entry[key];
                }  
            }
        }

        validData['id'] = entry.id;
        validData['contributor'] = entry.contributor;
        processedData.push(validData);
        })

    setProcData(processedData)

    }

    useEffect(() => {
        processData();
    }, [])

    return (
        <div className='Tabs'>
            <div className='buttons'>
                <button type='button' onClick={() => setTabState('desc')}>description</button>
                <button type='button' onClick={() => setTabState('data_entry')}>enter data</button>
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
                {(tabState === 'data_entry') && 
                    <DataEntry project={project}/>
                }
                {(tabState === 'raw_data') && 
                    <RawData procData={procData} creator={project.creator} admins={project.admin_list} />
                }
                {(tabState === 'data_vis') && 
                    <DataVis procData={procData} />
                }
                {(tabState === 'admin') && 
                    <AdminPanel p={project} setShowNewForm={setShowNewForm}/>
                }
            </div>
            
            
        </div>
    );
}

export default Tabs;