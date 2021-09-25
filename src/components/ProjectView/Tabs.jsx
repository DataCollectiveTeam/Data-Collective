import React, { useContext, useState } from 'react';
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
                    <RawData data={data} />
                }
                {(tabState === 'data_vis') && 
                    <DataVis data={data} />
                }
                {(tabState === 'admin') && 
                    <AdminPanel p={project} setShowNewForm={setShowNewForm}/>
                }
            </div>
            
            
        </div>
    );
}

export default Tabs;