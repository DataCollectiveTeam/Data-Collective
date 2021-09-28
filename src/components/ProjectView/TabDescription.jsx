import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../../DataContext';
import CitizenCard from './CitizenCard';
import axios from 'axios';

function TabDescription({project}) {

    const { URL } = useContext(DataContext);

    const [creator, setCreator] = useState([])
    const [admin, setAdmin] = useState([])
    const [contributors, setContributors] = useState([])

    useEffect(() => {
        const url = `${URL}/citizens/`;
        axios.get(url)
          .then(res => {
              let adminList = []
              let contributorList = []
              for (let c of res.data){
                if (project.creator === (c.id)){
                    setCreator(c)
                }
                if (project.admin_list.includes(c.id)){
                    adminList.push(c)
                }
                if (project.contributor_list.includes(c.id)){
                    contributorList.push(c)
                }
              }
              setAdmin(adminList)
              setContributors(contributorList)
            //if admin in (res.data) add to array
            //if contributor in res.data add to array
          }) 
          .catch(console.error)
    }, []);

    return (
        <div>
            <h2>project description</h2>
            <p>{project.description}</p>

            <div className="creator card-list">
                <h3>Creator</h3>
                <CitizenCard key={creator.id} c={creator}/>
            </div>

            <div className="admin card-list">
                <h3>Admin</h3>
                {admin.map((c) => {
                    return <CitizenCard key={c.id} c={c} />
                })}
            </div>

            <div className="contributor card-list">
                    <h3>Contributors</h3>
                    {contributors.map((c) => {
                        return <CitizenCard key={c.id} c={c} />
                    })}
            </div>
        </div>
    );
}

export default TabDescription;