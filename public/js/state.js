// Shared state module for SPA with persistence
// Exported state object S, setState merges updates, and simple pub/sub.
// Includes localStorage persistence for progress and notes.

const S = {};
const subscribers = new Set();
const STORAGE_KEY = 'kcse-prep-app-state';

// Load state from localStorage on initialization
function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      Object.assign(S, JSON.parse(saved));
    }
  } catch (e) {
    console.error('Failed to load state from localStorage', e);
  }
}

// Save state to localStorage
function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(S));
  } catch (e) {
    console.error('Failed to save state to localStorage', e);
  }
}

// Initialize state with loaded values
loadState();

// Default state values if not loaded from storage
if (!S.view) S.view = 'dashboard';
if (!S.subject) S.subject = null;
if (!S.form) S.form = 1;
if (!S.topicId) S.topicId = null;
if (!S.topicName) S.topicName = null;
if (!S.lesson) S.lesson = null;
if (!S.quiz) S.quiz = null;
if (!S.qcAnswers) S.qcAnswers = {};
if (!S.quizAnswers) S.quizAnswers = {};
if (!S.quizSubmitted) S.quizSubmitted = false;
if (!S.loading) S.loading = false;
if (!S.err) S.err = null;
if (!S.progress) S.progress = {};
if (!S.notes) S.notes = {};

function setState(partial) {
  if (partial && typeof partial === 'object') {
    Object.assign(S, partial);
    saveState(); // Persist changes to localStorage
    for (const cb of subscribers) {
      try { cb(S); } catch (e) {}
    }
  }
}

function subscribe(fn) {
  if (typeof fn !== 'function') return () => {};
  subscribers.add(fn);
  return () => { subscribers.delete(fn); };
}

function unsubscribe(fn) { subscribers.delete(fn); }

// Specific functions for progress and notes management
function markTopicDone(subject, form, topicId, silent = false) {
  const key = `${subject}_${form}_${topicId}`;
  S.progress[key] = true;
  saveState();
  if (!silent) {
    // Trigger UI update through subscribers
    for (const cb of subscribers) {
      try { cb(S); } catch (e) {}
    }
  }
}

function saveNote(noteId, content) {
  S.notes[noteId] = {
    content: content,
    timestamp: Date.now()
  };
  saveState();
}

function getNote(noteId) {
  return S.notes[noteId] ? S.notes[noteId].content : null;
}

function getAllNotes() {
  return S.notes;
}

module.exports = { 
  S, 
  setState, 
  subscribe, 
  unsubscribe,
  markTopicDone,
  saveNote,
  getNote,
  getAllNotes
};
