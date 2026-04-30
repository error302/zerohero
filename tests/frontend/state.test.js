// Jest test for shared state module
const { S, setState } = require('../../public/js/state.js');

test('setState updates shared state', () => {
  setState({ view: 'lesson' });
  expect(S.view).toBe('lesson');
});
