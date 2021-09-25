import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import axios from 'axios';
import './HomeView.css';
import SearchBar from './SearchBar';

const HomeView = () => {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const url = "http://localhost:8000/projects/";
        axios.get(url)
          .then(res => {
            setProjects(res.data);
            })
          .catch(console.error);
    }, []);

    if (projects){
        return (

            <div>
                <SearchBar setProjects={setProjects}/>
                <div className="HomeView">
                    {projects.map((p) => {
                            return <ProjectCard
                                key={p.id} p={p} 
                            />
                        })}
                </div>
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