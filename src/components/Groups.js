import React, { useState, useEffect } from 'react';
import { Button, TextField, Modal, Typography, Box, List, ListItem } from '@mui/material';
import '../App.css';

function Groups() {
    const [groups, setGroups] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [members, setMembers] = useState('');
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [membersModalOpen, setMembersModalOpen] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3902/api/groups')
            .then(response => response.json())
            .then(data => setGroups(data))
            .catch(error => console.error('Error fetching groups:', error));
    }, []);

    const handleAddGroup = () => {
        const groupMembers = members.split(',').map(member => member.trim());
        console.log({ groupName, groupMembers });  // Log the data being sent
    
        fetch('http://localhost:3902/api/groups', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ groupName, members: groupMembers })
        })
        .then(response => response.json())
        .then(data => {
            setGroups([...groups, data]);
            setModalOpen(false);
            setGroupName('');
            setMembers('');
        })
        .catch(error => console.error('Error creating group:', error));
    };

    const handleGroupClick = (group) => {
        fetch(`http://localhost:3902/api/groups/${group.id}`)
            .then(response => response.json())
            .then(data => {
                setSelectedGroup(data);
                setMembersModalOpen(true);
            })
            .catch(error => console.error('Error fetching group details:', error));
    };

    const handleDeleteGroup = (groupId) => {
        fetch(`http://localhost:3902/api/groups/${groupId}`, {
            method: 'DELETE',
        })
        .then(() => {
            setGroups(groups.filter(group => group.id !== groupId));
            setMembersModalOpen(false);
        })
        .catch(error => console.error('Error deleting group:', error));
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div className="App">
            <Typography variant="h4" gutterBottom>Groups</Typography>
            <div className="group-container">
                <Button variant="contained" onClick={() => setModalOpen(true)}>Add Group</Button>
                <div className="group-list">
                    {groups.map(group => (
                        <Button 
                            key={group.id} 
                            className="group-button" 
                            onClick={() => handleGroupClick(group)}
                        >
                            {group.groupName}
                        </Button>
                    ))}
                </div>
            </div>

            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Create a New Group
                    </Typography>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Group Name"
                        value={groupName}
                        onChange={e => setGroupName(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Members (comma-separated)"
                        value={members}
                        onChange={e => setMembers(e.target.value)}
                    />
                    <Button onClick={handleAddGroup} variant="contained" sx={{ mt: 2, mr: 1 }}>Create Group</Button>
                    <Button onClick={() => setModalOpen(false)} variant="outlined" sx={{ mt: 2 }}>Cancel</Button>
                </Box>
            </Modal>

            <Modal
                open={membersModalOpen}
                onClose={() => setMembersModalOpen(false)}
                aria-labelledby="modal-modal-members-title"
                aria-describedby="modal-modal-members-description"
            >
                <Box sx={style}>
                    {selectedGroup && (
                        <>
                            <Typography id="modal-modal-members-title" variant="h6" component="h2">
                                {selectedGroup.groupName} Members
                            </Typography>
                            <List>
                                {selectedGroup.members.map((member, index) => (
                                    <ListItem key={index}>
                                        {member.name}
                                    </ListItem>
                                ))}
                            </List>
                            <Button onClick={() => handleDeleteGroup(selectedGroup.id)} variant="contained" color="error" sx={{ mt: 2 }}>
                                Delete Group
                            </Button>
                            <Button onClick={() => setMembersModalOpen(false)} variant="contained" sx={{ mt: 2 }}>
                                Close
                            </Button>
                        </>
                    )}
                </Box>
            </Modal>
        </div>
    );
}

export default Groups;
