// public/js/quiz.js
// Quiz UI component: renders questions based on state S.view='quiz' and S.topicId
// Expects global S (state) and DOM element with id 'app'

const { S, subscribe } = require('./state.js');

function fetchQuiz(topicId) {
  // Synchronously require JSON file; in browser this would be a fetch.
  try {
    // Path relative to project root
    const data = require(`../../data/quizzes/${topicId}.json`);
    return Promise.resolve(data);
  } catch (e) {
    return Promise.reject(e);
  }
}

function renderQuiz(quiz) {
  const app = document.getElementById('app');
  if (!app) return;
  app.innerHTML = '';
  const form = document.createElement('form');
  quiz.questions.forEach((q, idx) => {
    const qDiv = document.createElement('div');
    qDiv.className = 'quiz-question';
    const qText = document.createElement('p');
    qText.className = 'quiz-qtext';
    qText.textContent = q.text;
    qDiv.appendChild(qText);
    q.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = opt;
      btn.addEventListener('click', () => {
        // clear previous classes
        const allBtns = qDiv.querySelectorAll('button');
        allBtns.forEach(b => b.classList.remove('right', 'wrong'));
        if (opt === q.answer) {
          btn.classList.add('right');
        } else {
          btn.classList.add('wrong');
        }
      });
      qDiv.appendChild(btn);
    });
    form.appendChild(qDiv);
  });
  // Submit button
  const submit = document.createElement('button');
  submit.type = 'button';
  submit.textContent = 'Submit';
  submit.addEventListener('click', () => {
    let correct = 0;
    const qDivs = form.querySelectorAll('.quiz-question');
    qDivs.forEach(div => {
      const chosen = div.querySelector('button.right');
      if (chosen && chosen.textContent === div.querySelector('.quiz-qtext').textContent) {
        // not reliable, compare to answer stored
      }
    });
    // Better: compare each selected option to answer
    quiz.questions.forEach((q, i) => {
      const div = qDivs[i];
      const selected = div.querySelector('button.right');
      if (selected && selected.textContent === q.answer) correct++;
    });
    alert(`Score: ${correct}/${quiz.questions.length}`);
    // Mark topic as done if score is good enough (80% or higher)
    const scorePercentage = Math.round((correct / quiz.questions.length) * 100);
    if (scorePercentage >= 80) {
      S.markTopicDone(S.subject, S.form, S.topicId, true);
    }
  });
  form.appendChild(submit);

  // Back button
  const back = document.createElement('button');
  back.type = 'button';
  back.textContent = 'Back to Lesson';
  back.addEventListener('click', () => {
    S.view = 'lesson';
    setState({ view: 'lesson' });
  });
  form.appendChild(back);

  app.appendChild(form);
}

function init() {
  // Subscribe to state changes
  subscribe(state => {
    if (state.view === 'quiz' && state.topicId) {
      fetchQuiz(state.topicId).then(renderQuiz).catch(err => {
        console.error('Failed to load quiz', err);
      });
    }
  });
  // initial render if already in quiz view
  if (S.view === 'quiz' && S.topicId) {
    fetchQuiz(S.topicId).then(renderQuiz);
  }
}

init();
