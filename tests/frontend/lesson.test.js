// Test that lesson module triggers fetch when view is set to lesson
// Use global fetch mock
global.fetch = jest.fn();

const lessonData = {
  title: 'Intro to Math',
  content: '<p>Welcome to math.</p>',
  quickCheck: []
};

beforeEach(() => {
  fetch.mockResolvedValue({ json: () => Promise.resolve(lessonData) });
});

test('loads lesson data on view change', async () => {
  const { S, setState } = require('../../public/js/state');
  document.body.innerHTML = '<div id="app"></div>';
  // Require lesson after mocking fetch
  require('../../public/js/lesson');
  setState({ view: 'lesson', topicId: 'intro-math' });
  // Wait tick for async fetch
  await new Promise(process.nextTick);
  expect(global.fetch).toHaveBeenCalledWith('/api/lessons/intro-math');
});
