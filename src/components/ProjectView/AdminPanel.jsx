import React, { useContext, useEffect, useState } from 'react';
import EditProjectModal from '../Modals/EditProjectModal';
import axios from 'axios';

const AdminPanel = ({p, setShowNewForm}) => {

    const [showEditModal, setShowEditModal] = useState(false);
    const [newAdmin, setNewAdmin] = useState('');
    const [newAdminId, setNewAdminId] = useState(null);
    const [users, setUsers] = useState(null);
    const [filteredUsers, setFilteredUsers] = useState(null);
    const [showUsers, setShowUsers] = useState(false);
    
    const editProject = () => {
        setShowEditModal(true);
    }

    const adminChange = (e) => {
        if (e.target.value === '') {
            setShowUsers(false);
            setFilteredUsers(null);
            setNewAdmin('')
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
                
            </div>
        </div>
    );
};

export default AdminPanel;