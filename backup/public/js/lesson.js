const { S, subscribe } = require('./state');

function renderLesson(lesson) {
  const app = document.getElementById('app');
  if (!app) return;
  app.innerHTML = `
    <div class="lesson">
      <h1 class="lesson-title">${lesson.title}</h1>
      <div class="lesson-content">${lesson.content}</div>
      <div class="quick-checks">
        ${lesson.quickCheck.map((q, i) => `
          <div class="quick-check" data-index="${i}">
            <p>${q.question}</p>
            <button class="check-btn">Check</button>
            <span class="feedback" style="display:none;"></span>
          </div>`).join('')}
      </div>
      <button class="back-btn">Back</button>
    </div>`;

  // Attach quick check handlers
  lesson.quickCheck.forEach((q, i) => {
    const btn = app.querySelector(`.quick-check[data-index="${i}"] .check-btn`);
    const feedback = app.querySelector(`.quick-check[data-index="${i}"] .feedback`);
    if (btn) {
      btn.addEventListener('click', () => {
        const userAns = prompt(q.question);
        if (userAns === null) return;
        const correct = userAns.trim() === q.answer.trim();
        feedback.textContent = correct ? 'Correct!' : `Incorrect, answer is ${q.answer}`;
        feedback.style.display = 'inline';
      });
    }
  });

  // Back button
  const backBtn = app.querySelector('.back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      // Assume navigating back sets view to 'subject'
      S.view = 'subject';
    });
  }
}

function loadLesson(topicId) {
  fetch(`/api/lessons/${topicId}`)
    .then(res => res.json())
    .then(data => renderLesson(data))
    .catch(err => console.error('Failed to load lesson', err));
}

// Subscribe to state changes
subscribe(state => {
  if (state.view === 'lesson' && state.topicId) {
    loadLesson(state.topicId);
  }
});
