/**
 * SuperMemo-2 (SM-2) Spaced Repetition Algorithm
 * 
 * Used to calculate the optimal next review date for a question based on user performance.
 * 
 * @param {number} quality - User's score/quality of response (0-5)
 *    5: perfect response
 *    4: correct response after a hesitation
 *    3: correct response recalled with serious difficulty
 *    2: incorrect response; where the correct one seemed easy to recall
 *    1: incorrect response; the correct one remembered
 *    0: complete blackout
 * @param {number} repetitions - Previous number of consecutive successful repetitions
 * @param {number} previousEaseFactor - Previous ease factor (default 2.5)
 * @param {number} previousInterval - Previous interval in days
 * 
 * @returns {Object} { nextReviewDate, easeFactor, interval, repetitions }
 */
export function calculateSM2(quality, repetitions, previousEaseFactor, previousInterval) {
  let easeFactor = previousEaseFactor;
  let interval = previousInterval;
  let newRepetitions = repetitions;

  // Update ease factor
  // EF':=EF+(0.1-(5-q)*(0.08+(5-q)*0.02))
  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (easeFactor < 1.3) easeFactor = 1.3;

  // Quality < 3 is considered a fail (reset repetitions)
  if (quality < 3) {
    newRepetitions = 0;
    interval = 1; // reset interval to 1 day
  } else {
    // Quality >= 3 is a pass
    newRepetitions += 1;

    if (newRepetitions === 1) {
      interval = 1;
    } else if (newRepetitions === 2) {
      interval = 6;
    } else {
      // For repetitions > 2, multiply previous interval by ease factor
      interval = Math.round(interval * easeFactor);
    }
  }

  // Calculate next review date
  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + interval);

  return {
    nextReviewDate,
    easeFactor,
    interval,
    repetitions: newRepetitions
  };
}
