const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public folder with UTF-8 charset for HTML files
app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, path, stat) => {
    if (path.endsWith('.html')) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
    }
  }
}));
// Serve static files from data folder (for JSON data)
app.use(express.static(path.join(__dirname, 'data')));

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

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

// API endpoint for lessons
app.get('/api/lessons/:topicId', (req, res) => {
  const { topicId } = req.params;
  const dataPath = path.join(__dirname, 'data', 'lessons', `${topicId}.json`);
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Failed to read ${topicId}.json`, err);
      return res.status(404).json({ error: 'Lesson not found' });
    }
    try {
      const json = JSON.parse(data);
      res.json(json);
    } catch (parseErr) {
      console.error(`Invalid JSON in ${topicId}.json`, parseErr);
      res.status(500).json({ error: 'Invalid lesson data' });
    }
  });
});

// API endpoint for quizzes
app.get('/api/quizzes/:topicId', (req, res) => {
  const { topicId } = req.params;
  const dataPath = path.join(__dirname, 'data', 'quizzes', `${topicId}.json`);
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Failed to read ${topicId}.json`, err);
      return res.status(404).json({ error: 'Quiz not found' });
    }
    try {
      const json = JSON.parse(data);
      res.json(json);
    } catch (parseErr) {
      console.error(`Invalid JSON in ${topicId}.json`, parseErr);
      res.status(500).json({ error: 'Invalid quiz data' });
    }
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

module.exports = app;
