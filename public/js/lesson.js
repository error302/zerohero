const { S, subscribe } = require('./state');

function renderLesson(lesson) {
  const app = document.getElementById('app');
  if (!app) return;
  // Our lesson data has: text (markdown) and qc (object with question, options, correct, explanation)
  app.innerHTML = `
    <div class="lesson">
      <div class="lesson-content">${renderMd(lesson.text)}</div>
      ${lesson.qc ? `
      <div class="quick-check" data-index="0">
        <p>${lesson.qc.question}</p>
        ${lesson.qc.options.map((opt, i) => `
          <button class="qc-opt" data-index="${i}">${opt}</button>
        `).join('')}
        <span class="feedback" style="display:none; margin-top:8px;"></span>
      </div>` : ''}
      <button class="back-btn">Back</button>
    </div>`;

  // Attach quick check handlers
  if (lesson.qc) {
    const opts = app.querySelectorAll('.qc-opt');
    const feedback = app.querySelector('.feedback');
    opts.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        // Reset all buttons
        opts.forEach(b => b.classList.remove('qc-correct', 'qc-wrong'));
        // Mark selected
        btn.classList.add(i === lesson.qc.correct ? 'qc-correct' : 'qc-wrong');
        feedback.textContent = i === lesson.qc.correct
          ? 'Correct! ' + lesson.qc.explanation
          : 'Incorrect. ' + lesson.qc.explanation;
        feedback.style.display = 'inline';
        feedback.style.color = i === lesson.qc.correct ? '#085041' : '#A32D2D';
      });
    });
  }

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
