import React, { useState, useEffect, useContext } from 'react';
import ProjectCard from './ProjectCard';
import axios from 'axios';
import './HomeView.css';
import SearchBar from './SearchBar';
import { DataContext } from '../../DataContext';

const HomeView = () => {
    
    const { URL } = useContext(DataContext);

    //store all projects in an array
    const [projects, setProjects] = useState([]);

    //get all projects and store in state
    useEffect(() => {
        const url = `${URL}/projects/`;
        axios.get(url)
          .then(res => {
            setProjects(res.data);
            })
          .catch(console.error);
    }, []);

    //return project cards if axios call succeeds
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