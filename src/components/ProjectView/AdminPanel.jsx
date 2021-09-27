import React, { useContext, useEffect, useState } from 'react';
import EditProjectModal from '../Modals/EditProjectModal';
import axios from 'axios';
import DataVisModal from '../Modals/DataVisModal';

const AdminPanel = ({p, setShowNewForm, procData}) => {

    const [showEditModal, setShowEditModal] = useState(false);
    const [newAdmin, setNewAdmin] = useState('');
    const [newAdminId, setNewAdminId] = useState(null);
    const [users, setUsers] = useState(null);
    const [filteredUsers, setFilteredUsers] = useState(null);
    const [showUsers, setShowUsers] = useState(false);
    const [showDataVisModal, setShowDataVisModal] = useState(false);
    
    //displays edit project modal
    const editProject = () => {
        setShowEditModal(true);
    }

    //functionality for admin add search bar
    const adminChange = (e) => {
        //if search field is empty
        //don't show users
        //set filtered results to null
        //and set newAdmin to an empty string
        if (e.target.value === '') {
            setShowUsers(false);
            setFilteredUsers(null);
            setNewAdmin('')
        //otherwise
        //show list of users matching what's in the search field
        //set filtered users to users matching what's in the search field
        //set newAdmin to the value in the search field
        } else {
            setShowUsers(true);
            setFilteredUsers(users.filter(user => user.name.includes(e.target.value)));
            setNewAdmin(e.target.value);
        }
    }

    const addAdmin = () => {
        setShowUsers(false);
        setFilteredUsers(null);
        setNewAdmin('');
        let newAdminList = {admin_list: [...p.admin_list, newAdminId]}
        const url = `http://localhost:8000/projects/${p.id}`
        axios.patch(url, newAdminList)
            .then(res => console.log(res))
            .catch(console.error);
    }

    const deleteProject = () => {
        const url = `http://localhost:8000/`
        axios.delete(`${url}projects/${p.id}`)
        .then(res => console.log(res))
        .catch(console.error);
    }

    useEffect(() => {
        const url = 'http://localhost:8000/citizens/'
        axios.get(url)
            .then(res => setUsers(res.data))
            .catch(console.error);
    }, [])

    return (
        <div>
            {showEditModal &&
                <EditProjectModal p={p} setShowEditModal={setShowEditModal}/>
            }
            {showDataVisModal &&
                <DataVisModal p={p} setShowDataVisModal={setShowDataVisModal} procData={procData}/>
            }
            <div className='project-admin-buttons'>
                <button type='button' onClick={() => setShowNewForm(true)} >add new form</button> 
                <button className='edit-project-button' type='button' onClick={editProject} ><span className='far fa-edit'>Edit</span></button>
                <button className='delete-project-button' type='button' onClick={deleteProject} ><span className='far fa-trash-alt'>Delete</span></button>
                <div className='add-admin-div'>
                    <input type='text' placeholder='add admin' value={newAdmin} onChange={adminChange} />
                    <button type='button' onClick={addAdmin}>add admin</button>
                    {showUsers && 
                        <div className='user-intellisense'>
                            {filteredUsers.map(user => {
                                return <p key={user.name} onClick={() => {setNewAdminId(user.id); setNewAdmin(user.name)}}>{user.name}</p>
                            })}
                        </div>
                    }
                </div>
                <button type='button' onClick={() => setShowDataVisModal(true)} >add data visualization</button>
            </div>
        </div>
    );
};

export default AdminPanel;