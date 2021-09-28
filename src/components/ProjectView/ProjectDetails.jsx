import React, { useState, useEffect } from 'react';
import CitizenCard from './CitizenCard';
import axios from 'axios';

const ProjectDetails = ({p}) => {

    const [creator, setCreator] = useState([])
    const [admin, setAdmin] = useState([])
    const [contributors, setContributors] = useState([])

    useEffect(() => {
        const url = "http://localhost:8000/citizens/";
        axios.get(url)
          .then(res => {
              let adminList = []
              let contributorList = []
              for (let c of res.data){
                if (p.creator === (c.id)){
                    setCreator(c)
                }
                if (p.admin_list.includes(c.id)){
                    adminList.push(c)
                }
                if (p.contributor_list.includes(c.id)){
                    contributorList.push(c)
                }
              }
              console.log("Admin List", adminList)
              console.log("Contributor List", contributorList)
              setAdmin(adminList)
              setContributors(contributorList)
            //if admin in (res.data) add to array
            //if contributor in res.data add to array
          }) 
          .catch(console.error)
    }, []);

    return (
        <div className="Project Details">

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

                <p>Description: {p.description}</p>
                <p>Date Created: {p.date_created}</p>
                
                <div className="contributor card-list">
                    <h3>Contributors</h3>
                    {contributors.map((c) => {
                        return <CitizenCard key={c.id} c={c} />
                    })}
                </div>

        </div>
    );
};

export default ProjectDetails;