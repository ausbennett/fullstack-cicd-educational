const express = require('express');
const cors = require('cors');
const Team = require('./models/team');

const app = express();

app.use(cors());
app.use(express.json());

const MAX_RETRIES = 5;
const RETRY_INTERVAL = 5000;  // 5 seconds

function syncTeam(attempts = 0) {
    Team.sync()
        .then(() => {
            console.log('Team table has been synced');
        })
        .catch((error) => {
            console.error('Could not sync the Team table:', error);

            if (attempts < MAX_RETRIES) {
                console.log(`Retrying in ${RETRY_INTERVAL / 1000} seconds... (Attempt ${attempts + 1} of ${MAX_RETRIES})`);
                setTimeout(() => syncTeam(attempts + 1), RETRY_INTERVAL);
            } else {
                console.error("Max retries reached. Giving up on syncing the Team table.");
            }
        });
}

// Start the synchronization process
syncTeam();


app.get('/api/teams', async (req, res) => {
  const teams = await Team.findAll();
  res.json(teams);
});

app.post('/api/teams', async (req, res) => {
  try {
    const newTeam = await Team.create({
      name: req.body.name,
      score: req.body.score,
    });
    res.status(201).json(newTeam);
  } catch (error) {
    console.error("Error creating team:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
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
