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

    const [project, setProject] = useState(null);
    const [showNewForm, setShowNewForm] = useState(false);

    useEffect(() => {
        const url = `http://localhost:8000/projects/${id}`;
        axios.get(url)
          .then(res => {
            setProject(res.data);
            })
          .catch(console.error);
    }, [id]);

    if(project){
        return (
            <div className="ProjectView">
                {(showNewForm === true) && 
                    <NewFormModal setShowNewForm={setShowNewForm} thisProject={id} />
                }
                <ProjectHeader p={project}/>
                <ProjectDetails p={project}/>
                {project && 
                    <Tabs project={project} setShowNewForm={setShowNewForm}/>
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