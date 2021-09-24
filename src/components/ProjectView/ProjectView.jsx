import React, { useState,useEffect, useContext } from "react";
import ProjectDetails from './ProjectDetails';
import ProjectHeader from './ProjectHeader';
import axios from "axios";
import { DataContext } from "../../DataContext";
import NewFormModal from "../Modals/NewFormModal";

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
                <button type='button' onClick={() => setShowNewForm(true)} >add new form</button> 
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