import React, { useContext, useState } from 'react';
import axios from 'axios';
import { DataContext } from '../../DataContext';

const SearchBar = ({setProjects}) => {

    const { URL } = useContext(DataContext);

    //state to store search item as string
    const [searchItem, setSearchItem] = useState('');
    
    //store changes to search item in state
    const handleChange = (e) => {
        setSearchItem(e.target.value);
    }
    
    //submit search when if enter key pressed on text input
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    }

    //make axios call for projects with or without filter
    const getProjects = (url) => {
        axios.get(url)
        .then(res => {
            setProjects(res.data);
            setSearchItem('');
        })
        .catch(console.error);
    } 

    //filter posts by search term on submit
    const handleSubmit = () => {
        const url = `${URL}/projects/?search=${searchItem}`
        getProjects(url)
    }

    //return all projects
    const handleClear = () => {
        const url = `${URL}/projects/`
        getProjects(url)
    }

    //display search bar
    return (
        <div className='SearchBar'>
            <input className='searchbar-input' type='text' placeholder='search projects' value={searchItem} onKeyDown={handleKeyDown} onChange={handleChange} />
            <button className='searchbar-submit' type='button' onClick={handleSubmit}><span className='fas fa-search'></span></button>
            <button className='searchbar-clear' type='button' onClick={handleClear}><span><i class="fas fa-backspace"></i></span></button>
        </div>
    );
};

export default SearchBar;