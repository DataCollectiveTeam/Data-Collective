import React from 'react';
import './SplashPage.css'

import logDataImg from '../log-data.png'
import newProject from '../add-project.png'
import addForm from '../add-new-form.png'
import rawData from '../raw-data.png'
import addVis from '../add-data-vis.png'
import vis1 from '../data-vis-example-1.png'
import vis2 from '../data-vis-example-2.png'

function SplashPage({newUserModal, setNewUserModal}) {
    return (
        <div className='SplashPage'>
            
            <div className='content-div'>
                <h1 className='centered'>DataCollective</h1>
                <p>Data Collective is a citizen science platform for anyone to participate in scientific research and observation. Data Collective users can create projects tracking topics they care about, gather relevant data, and create accessible visualizations to share their findings.</p>
                <h2>Why Citizen Science Matters</h2>
                <p>Citizen Science expands the capacity of the scientific research community by encouraging non-professionals to engage in research and observation. Public involvement in a research initiative allows for a larger scale of data collection and encourages the grassroots support of more localized projects.</p>
                <p>Citizen Science projects also expand public understanding of the scientific research process through participation. Incorporating citizen science into schools’ curriculum supports authentic, project-based exposure to core science practices. Community-based Citizen Science initiatives encourage life-long science learning outside of the classroom and foster investment in local ecosystems.</p>
            </div>

            <a className='see-projects-link' href='/projects'>See Projects</a>
            <div className='content-div'>
                <h2 className='centered'>How To Get Involved</h2>
                <h3><span className='num'>1</span> Contribute to an active project:</h3>
                <img src={logDataImg} alt='log data button'/>
                <p>Search for projects that interest you and see what data they are looking for. If it’s practical for you to contribute, get outside and get to work.  The data entry form for each project will help format your data to be sure you are including all the relevant fields.</p>
                <h3><span className='num'>2</span> Start your own project:</h3>
                <img src={newProject} alt='add project button' />
                <p>With citizen science, it’s best to start small. Pick a project that is:</p>
                <ul>
                    <li>Small in scope. Choose something local to your town, city, or watershed. This will help you find contributors who are invested in your project.</li>
                    <li>Low impact. Asking contributors to observe something from a distance is more sustainable than data that requires taking a sample.</li>
                    <li>Easy to record. Choose a few data points that don’t require specialized equipment to collect.</li>
                </ul>
            </div>
            <div className='content-div'>
                <h2 className='centered'>How to Create a Project</h2>
                <h3>Create a Form</h3>
                <img src={addForm} alt='add new form' />
                <p>Select the data types your project will collect and label the inputs. Contributors will use this form each time they enter data, ensuring a consistent format for data entries. If contributors will need further instructions on how to enter their observations, be sure to include these steps in the project description.</p>
                <h3>Gather Data</h3>
                <img className='vis-image' src={rawData} alt='data points' />
                <p>Recruit contributors by sharing your project with interested parties, whether that means students, friends, or members of your community. As your project grows, more people will be inspired to contribute. All projects are based on open access to data, but you can remove any erroneous entries.</p>
                <h3>Share your Results</h3>
                <img src={addVis} alt='add data visualization' />
                <p>Use the admin tab on your project to create a new data visualization.  Create line, bar, or pie charts to help users interpret your results.  Any chart you create will automatically update as more data is added.</p>
                <div className='vis-images'>
                    <img className='vis-image' src={vis1} alt='example data vis' />
                    <img className='vis-image' src={vis2} alt='example data vis' />
                </div>
            </div>
            <button className='join-button' type='button' onClick={() => setNewUserModal(!newUserModal)} >Join DataCollective</button>
            <h3>Learn more about citizen science <a className='citizen-science-link' href='https://www.citizenscience.gov/#' rel='noreferrer' target='_blank'>here</a>.</h3>
        </div>
    );
}

export default SplashPage;