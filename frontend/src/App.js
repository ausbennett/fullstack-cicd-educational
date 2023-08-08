import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [teams, setTeams] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamName, setTeamName] = useState('');
  const [teamScore, setTeamScore] = useState(0);

  const apiUrl = "http://localhost:5001/api/teams"

  // Fetch teams when component mounts
  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setTeams(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  const handleAddTeam = () => {
    const newTeam = {
      name: teamName,
      score: parseInt(teamScore),
    };

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTeam),
    })
      .then((response) => response.json())
      .then((data) => setTeams([...teams, data]))
      .catch((error) => console.error('Error:', error));

    setTeamName('');
    setTeamScore(0);
    setShowAddModal(false);
  };

  const handleEditTeam = () => {
    const updatedTeam = {
      name: teamName,
      score: parseInt(teamScore),
    };

    fetch(`${apiUrl}/${selectedTeam.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTeam),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedTeams = teams.map((team) =>
          team.id === selectedTeam.id ? data : team
        );
        setTeams(updatedTeams);
      })
      .catch((error) => console.error('Error:', error));

    setTeamName('');
    setTeamScore(0);
    setShowEditModal(false);
  };

  const handleDeleteTeam = (id) => {
    fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedTeams = teams.filter((team) => team.id !== id);
        setTeams(updatedTeams);
      })
      .catch((error) => console.error('Error:', error));
  };

  const handleOpenEditModal = (team) => {
    setSelectedTeam(team);
    setTeamName(team.name);
    setTeamScore(team.score);
    setShowEditModal(true);
  };

  return (
    <Container>
      <h1 className="title">Volleyball Teams</h1>

      <Table striped bordered className="teams-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Team Name</th>
            <th>Score</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.id}>
              <td>{team.id}</td>
              <td>{team.name}</td>
              <td>{team.score}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleOpenEditModal(team)}
                >
                  Edit
                </Button>{' '}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteTeam(team.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="success" onClick={() => setShowAddModal(true)}>
        Add Team
      </Button>

      {/* Add Team Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="teamName">
              <Form.Label>Team Name</Form.Label>
              <Form.Control
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="teamScore">
              <Form.Label>Score</Form.Label>
              <Form.Control
                type="number"
                value={teamScore}
                onChange={(e) => setTeamScore(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddTeam}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Team Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="teamName">
              <Form.Label>Team Name</Form.Label>
              <Form.Control
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="teamScore">
              <Form.Label>Score</Form.Label>
              <Form.Control
                type="number"
                value={teamScore}
                onChange={(e) => setTeamScore(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditTeam}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default App;
