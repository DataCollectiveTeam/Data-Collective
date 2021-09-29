import React, { useState,useEffect, useContext } from "react";
import ProjectHeader from './ProjectHeader';
import axios from "axios";
import { DataContext } from "../../DataContext";
import NewFormModal from "../Modals/NewFormModal";
import AdminPanel from "./AdminPanel";
import './ProjectView.css';
import Tabs from "./Tabs";

const ProjectView = ({id}) => {

    const {thisUser, URL } = useContext(DataContext);

    const [project, setProject] = useState(null);
    const [data, setData] = useState(null);
    const [showNewForm, setShowNewForm] = useState(false);

    //get info for this project and this project's data
    useEffect(() => {
        const url = `${URL}/projects/${id}`;
        const url2 = `${URL}/project_data/${id}`
        axios.all([
            axios.get(url),
            axios.get(url2)
        ])
        .then(axios.spread((res1, res2) => {
            setProject(res1.data);
            console.log(res2)
            setData(res2.data)
        }))
        .catch(console.error)
    }, [id]);

    if(data && project) {
        return (
            <div className="ProjectView">
                <ProjectHeader p={project}/>
                {project && 
                    <Tabs project={project} data={data} setShowNewForm={setShowNewForm}/>
                }
                {(showNewForm === true) && 
                    <NewFormModal setShowNewForm={setShowNewForm} thisProject={id} />
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