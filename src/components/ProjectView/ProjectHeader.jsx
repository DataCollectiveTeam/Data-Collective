import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../DataContext';

const ProjectHeader = ({p}) => {

    const { URL } = useContext(DataContext);
    
    let dateOptions = {year: 'numeric', month: 'long', day: 'numeric'};
    const dateStarted = new Date(p.date_created).toLocaleDateString(undefined, dateOptions)
    const [creator, setCreator] = useState(null);

    const getCreator = () => {
        const url = `${URL}/citizens/${p.creator}`
        axios.get(url)
            .then(res => setCreator(res.data))
            .catch(console.error);
    }

    useEffect(() => {
        getCreator()
    }, [])

    return (
        <div className="ProjectHeader">
            <div className='project-info'>
                <img className='project-img' src={p.img} alt={p.name} />
                <div className='creator-info'>
                    <h2 className='project-title'>{p.name}</h2>
                    {creator && 
                        <h4>started by: <a className='user-link' href={`/citizens/${creator.id}`} >{creator.name}</a></h4>
                    }
                    <h4>on {dateStarted}</h4>
                </div>
                
            </div>
            <p className='project-heading'>{p.header}</p>
        </div>
    );
};

export default ProjectHeader;