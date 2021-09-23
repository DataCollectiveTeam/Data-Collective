import React, { useState,useEffect } from "react";
import ProjectDetails from './ProjectDetails';
import ProjectHeader from './ProjectHeader';
import axios from "axios";

const ProjectView = ({id}) => {

    const [project, setProject] = useState(null);

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
                <ProjectHeader p={project}/>
                <ProjectDetails p={project}/>
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