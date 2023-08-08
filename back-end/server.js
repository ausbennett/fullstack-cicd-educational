const express = require('express');
const cors = require('cors');
const Team = require('./models/team');

const app = express();

app.use(cors());
app.use(express.json());

// Sync models with database
Team.sync()
  .then(() => console.log('Team table has been synced'))
  .catch((error) => console.error('Could not sync the Team table', error));

app.get('/api/teams', async (req, res) => {
  const teams = await Team.findAll();
  res.json(teams);
});

app.post('/api/teams', async (req, res) => {
  const newTeam = await Team.create({
    name: req.body.name,
    score: req.body.score,
  });
  res.status(201).json(newTeam);
});

app.put('/api/teams/:id', async (req, res) => {
  const { id } = req.params;
  const { name, score } = req.body;

  const team = await Team.findByPk(id);

  if (team) {
    team.name = name;
    team.score = score;
    await team.save();

    res.json(team);
  } else {
    res.status(404).json({ message: 'Team not found' });
  }
});

app.delete('/api/teams/:id', async (req, res) => {
  const { id } = req.params;

  const team = await Team.findByPk(id);

  if (team) {
    await team.destroy();
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Team not found' });
  }
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
