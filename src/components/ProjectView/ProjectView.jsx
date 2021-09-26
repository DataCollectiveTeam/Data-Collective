import React, { useState,useEffect, useContext } from "react";
import ProjectDetails from './ProjectDetails';
import ProjectHeader from './ProjectHeader';
import axios from "axios";
import { DataContext } from "../../DataContext";
import NewFormModal from "../Modals/NewFormModal";
import AdminPanel from "./AdminPanel";
import './ProjectView.css';
import Tabs from "./Tabs";

const ProjectView = ({id}) => {

    const {thisUser} = useContext(DataContext);

    const defaultProjectData = {
        adminList: null,
        contributorList: null,
        project: null,
        data: null
    }

    const [project, setProject] = useState(null);
    const [data, setData] = useState(null);
    const [showNewForm, setShowNewForm] = useState(false);


    useEffect(() => {
        const url = `http://localhost:8000/projects/${id}`;
        const url2 = `http://localhost:8000/project_data/${id}`
        axios.all([
            axios.get(url),
            axios.get(url2)
        ])
        .then(axios.spread((res1, res2) => {
            setProject(res1.data);
            console.log(res2)
            setData(res2.data)
        }))
        // .catch(console.error)
    }, [id]);

    if(data && project) {
        return (
            <div className="ProjectView">
                <p>loaded</p>
                {(showNewForm === true) && 
                    <NewFormModal setShowNewForm={setShowNewForm} thisProject={id} />
                }
                <ProjectHeader p={project}/>
                <ProjectDetails p={project}/>
                {project && 
                    <Tabs project={project} data={data} setShowNewForm={setShowNewForm}/>
                }
                
            </div>
          );
    } else {
        return (
            <div className="ProjectView">
                <p>Loading...</p>
            </div>
        );
      }
}

export default ProjectView;