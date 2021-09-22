import React from 'react';
import ProjectHeader from './ProjectHeader';
import ProjectDetails from './ProjectDetails';

function ProjectCard({p}) {
    return (
        <div className="ProjectCard">
            <ProjectHeader p={p}/>
            <ProjectDetails p={p}/>
        </div>
    );
}

export default ProjectCard;