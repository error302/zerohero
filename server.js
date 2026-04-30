const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// New API endpoint for subjects
app.get('/api/subjects', (req, res) => {
  const dataPath = path.join(__dirname, 'data', 'subjects.json');
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Failed to read subjects.json', err);
      return res.status(500).json({ error: 'Unable to load subjects' });
    }
    try {
      const json = JSON.parse(data);
      res.json(json);
    } catch (parseErr) {
      console.error('Invalid JSON in subjects.json', parseErr);
      res.status(500).json({ error: 'Invalid subjects data' });
    }
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

module.exports = app;
