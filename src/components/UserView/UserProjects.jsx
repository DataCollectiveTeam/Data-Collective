import React from 'react';
import ProjectCard from '../HomeView/ProjectCard';

const UserProjects = ({projects}) => {
    return (
        <div className='UserProjects'>
            {projects.map(project => <ProjectCard key={project.id} p={project} />)}
        </div>
    );
};

export default UserProjects;