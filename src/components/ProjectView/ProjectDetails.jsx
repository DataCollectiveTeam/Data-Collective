import React from 'react';

const ProjectDetails = ({p}) => {
    return (
        <div className="Project Details">
                <div className="card-image">
                    <img src={p.img} alt={p.name} />
                </div>
                <div className="card-body">
                    <p>Creator: {p.creator}</p>
                    <p>Admin: {p.admin_list}</p>
                    <p>Description: {p.description}</p>
                    <p>Date Created: {p.date_created}</p>
                    <p>Contributors: {p.contributor_list}</p>
                </div>
            </div>
    );
};

export default ProjectDetails;