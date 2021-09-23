import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import axios from 'axios';
import './HomeView.css';

const HomeView = ({logInModal}) => {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const url = "http://localhost:8000/projects/";
        axios.get(url)
          .then(res => {
            setProjects(res.data);
            })
          .catch(console.error);
    }, [logInModal]);

    if (projects){
        return (
            <div className="HomeView">
                {projects.map((p) => {
                        return <ProjectCard
                            key={p.id} p={p} 
                        />
                    })}
            </div>
        )
    } else {
        return (
            <div className="HomeView empty">
                <h2>loading projects...</h2>
            </div>
        )
    }
};

export default HomeView;