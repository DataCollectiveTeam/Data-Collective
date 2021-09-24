import React from 'react';

function TabDescription({project}) {
    return (
        <div>
            <h2>project description</h2>
            <p>{project.description}</p>
        </div>
    );
}

export default TabDescription;