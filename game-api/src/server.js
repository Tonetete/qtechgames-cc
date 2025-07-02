const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const GAMES_FILE_PATH = path.join(__dirname, '../../', 'public', 'games.json');

// GET all games
app.get('/api/games', (req, res) => {
  try {
    const games = JSON.parse(fs.readFileSync(GAMES_FILE_PATH));

    const page = parseInt(req.query.page) || 0;
    const pageSize = parseInt(req.query.pageSize) || 50;
    const searchTerm = req.query.search || '';

    const filtered = searchTerm
      ? games.filter(
          (game) =>
            game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            game.studio.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      : games;

    const start = page * pageSize;
    const end = start + pageSize;
    const items = filtered.slice(start, end);
    const nextPage = end < filtered.length ? page + 1 : null;

    res.json({
      items,
      nextPage,
      totalCount: filtered.length,
    });
  } catch (error) {
    console.error('Error reading games file:', error);
    res.status(500).json({ error: 'Failed to fetch games' });
  }
});

// GET game by ID
app.get('/api/games/:id', (req, res) => {
  try {
    const { id } = req.params;
    const games = JSON.parse(fs.readFileSync(GAMES_FILE_PATH));
    const game = games.find((g) => g.id === id);

    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    res.json(game);
  } catch (error) {
    console.error('Error fetching game:', error);
    res.status(500).json({ error: 'Failed to fetch game details' });
  }
});

// UPDATE game rating
app.patch('/api/games/:id/rating', (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;

    if (!rating || typeof rating !== 'number' || rating < 0 || rating > 5) {
      return res.status(400).json({ error: 'Invalid rating value' });
    }

    const games = JSON.parse(fs.readFileSync(GAMES_FILE_PATH));

    const gameIndex = games.findIndex((game) => game.id === id);

    if (gameIndex === -1) {
      return res.status(404).json({ error: 'Game not found' });
    }

    games[gameIndex] = {
      ...games[gameIndex],
      rating: rating,
    };

    fs.writeFileSync(GAMES_FILE_PATH, JSON.stringify(games, null, 2));

    res.json({ success: true, game: games[gameIndex] });
  } catch (error) {
    console.error('Error updating game rating:', error);
    res.status(500).json({ error: 'Failed to update game rating' });
  }
});

// Start server only if not being required (for testing)
let server;
if (require.main === module) {
  server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Games API available at http://localhost:${PORT}/api/games`);
  });
}

module.exports = app;
