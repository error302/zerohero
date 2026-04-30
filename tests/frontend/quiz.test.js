// jest test for quiz component
const fs = require('fs');
const path = require('path');

// Load state module (assumes it sets global.S or export)
const stateModule = require('../../public/js/state.js');
const S = stateModule.default || stateModule;

describe('Quiz UI', () => {
  beforeAll(() => {
    // set state for quiz view
    S.view = 'quiz';
    S.topicId = 'intro-math';
    // expose S globally if used by quiz.js
    global.S = S;
  });

  test('renders first question text', async () => {
    document.body.innerHTML = '<div id="app"></div>';
    const { setState } = require('../../public/js/state.js');
    // Require quiz module after setting globals
    require('../../public/js/quiz.js');
    
    // Trigger render explicitly via subscription
    setState({ view: 'quiz', topicId: 'intro-math' });
    
    await new Promise(r => setTimeout(r, 100));
    const qtext = document.querySelector('.quiz-qtext');
    expect(qtext).not.toBeNull();
    expect(qtext.textContent).toContain('What is 2+2');
  });
});
