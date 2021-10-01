import React from 'react';
import { Link } from 'react-router-dom';
import './HomeView.css';

function ProjectCard({p}) {
    //card component for each project in homeview and user view
    return (
        <Link className="ProjectCard" to={`/projects/${p.id}`} key={p.id}>
            <div className="card-title">
                <h3>{p.name}</h3>
            </div>
            <div className="card-image">
                <img src={p.img} alt={p.name} />
            </div>
            <hr className='horizontal-line'/>
            <div className='card-heading'>
                <p>{p.header}</p>
            </div>
            <div className="card-body">
                <p>Contributors: {p.contributor_list.length}</p>
            </div>
        </Link>
    );
}

export default ProjectCard;