import React, { useContext, useEffect, useState } from 'react';
import EditProjectModal from '../Modals/EditProjectModal';
import axios from 'axios';
import DataVisModal from '../Modals/DataVisModal';
import { DataContext } from '../../DataContext';
import DeleteProjectModal from '../Modals/DeleteProjectModal';

const AdminPanel = ({p, setShowNewForm, procData}) => {

    const { URL } = useContext(DataContext);

    const [showEditModal, setShowEditModal] = useState(false);
    const [newAdmin, setNewAdmin] = useState('');
    const [newAdminId, setNewAdminId] = useState(null);
    const [users, setUsers] = useState(null);
    const [filteredUsers, setFilteredUsers] = useState(null);
    const [showUsers, setShowUsers] = useState(false);
    const [showDataVisModal, setShowDataVisModal] = useState(false);
    const [deleteProjectModal, setDeleteProjectModal] = useState(false);
    const [hasForm, setHasForm] = useState(false);
    
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
        const url = `${URL}/projects/${p.id}`
        axios.patch(url, newAdminList)
            .then(res => console.log(res))
            .catch(console.error);
    }

    useEffect(() => {
        const url = `${URL}/citizens/`
        const url2 = `${URL}/formgrab/${p.id}`
        axios.all([
            axios.get(url),
            axios.get(url2)
        ])
        .then(axios.spread((res1, res2) => {
            setUsers(res1.data)
            if (res2.data.length > 0) {
                setHasForm(true);
            }
        }))
        .catch(console.error);
    }, [])

    return (
        <div>
            {deleteProjectModal &&
                <DeleteProjectModal 
                    p={p} 
                    setDeleteProjectModal={setDeleteProjectModal} 
                />
            }
            {showEditModal &&
                <EditProjectModal 
                    p={p} 
                    setShowEditModal={setShowEditModal}
                />
            }
            {showDataVisModal &&
                <DataVisModal 
                    p={p} 
                    setShowDataVisModal={setShowDataVisModal} 
                    procData={procData}
                />
            }
            <div className='project-admin-buttons'>
                {(!hasForm) && 
                    <div>
                        <button type='button' onClick={() => setShowNewForm(true)} >add new form</button> 
                    </div>
                }
                <div>
                    <button className='edit-project-button' type='button' onClick={editProject} ><span className='far fa-edit'>Edit Project</span></button>
                    <button className='delete-project-button' type='button' onClick={() => setDeleteProjectModal(true)} ><span className='far fa-trash-alt'>Delete Project</span></button>
                </div>
                
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