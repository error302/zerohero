// Shared state module for SPA
// Exported state object S, setState merges updates, and simple pub/sub.

const S = {};
const subscribers = new Set();

function setState(partial) {
  if (partial && typeof partial === 'object') {
    Object.assign(S, partial);
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

module.exports = { S, setState, subscribe, unsubscribe };
