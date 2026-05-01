"use client";

import { useState } from "react";

export default function QuizClient({ questions, topic }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const question = questions[currentIndex];
  
  // Parse options safely
  let parsedOptions = [];
  try {
    parsedOptions = question?.options ? JSON.parse(question.options) : [];
  } catch (e) {
    parsedOptions = [];
  }

  const handleReveal = () => {
    if (!selectedOption) return;
    setIsRevealed(true);
  };

  const handleSM2Rating = async (qualityScore) => {
    setIsSubmitting(true);
    try {
      // Ignore DB save for dummy questions
      if (!question.id.startsWith("dummy")) {
        await fetch("/api/quiz/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            questionId: question.id,
            quality: qualityScore, // 0-5
          }),
        });
      }

      // Move to next question or finish
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedOption(null);
        setIsRevealed(false);
      } else {
        setIsFinished(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isFinished) {
    return (
      <div className="glass-panel p-10 text-center space-y-6 animate-fade-in border-green-500/30">
        <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto text-5xl">
          🎉
        </div>
        <h2 className="text-3xl font-bold text-white">Quiz Complete!</h2>
        <p className="text-text-muted text-lg">
          You've completed the active recall session for <strong>{topic.name}</strong>.<br/>
          The spaced repetition algorithm has scheduled your next reviews.
        </p>
        <div className="pt-6">
          <a href={`/subject/${topic.subject.slug}`} className="px-8 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl transition-colors inline-block">
            Back to Topics
          </a>
        </div>
      </div>
    );
  }

  if (!question) return null;

  const isCorrect = selectedOption === question.correctAnswer;

  return (
    <div className="space-y-8 animate-fade-in w-full">
      {/* Progress Bar */}
      <div className="w-full h-2 bg-surface rounded-full overflow-hidden border border-border">
        <div 
          className="h-full bg-primary transition-all duration-500" 
          style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question Card */}
      <div className="glass-panel p-8">
        <div className="text-sm font-bold text-primary mb-4 uppercase tracking-wider">
          Question {currentIndex + 1} of {questions.length}
        </div>
        <h2 className="text-2xl font-bold text-white mb-8 leading-relaxed">
          {question.questionText}
        </h2>

        <div className="space-y-4">
          {parsedOptions.map((opt, i) => {
            const isSelected = selectedOption === opt;
            const isActualCorrect = opt === question.correctAnswer;
            
            let buttonClass = "w-full text-left p-4 rounded-xl border transition-all duration-200 ";
            
            if (!isRevealed) {
              buttonClass += isSelected 
                ? "bg-primary/20 border-primary text-white" 
                : "bg-surface border-border text-text hover:bg-surface-hover hover:border-gray-500";
            } else {
              if (isActualCorrect) {
                buttonClass += "bg-green-500/20 border-green-500 text-green-100";
              } else if (isSelected && !isActualCorrect) {
                buttonClass += "bg-red-500/20 border-red-500 text-red-100";
              } else {
                buttonClass += "bg-surface/50 border-border opacity-50";
              }
            }

            return (
              <button
                key={i}
                disabled={isRevealed}
                onClick={() => setSelectedOption(opt)}
                className={buttonClass}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${
                    isSelected ? "border-primary bg-primary/20" : "border-gray-500"
                  }`}>
                    {isSelected && <div className="w-3 h-3 bg-primary rounded-full"></div>}
                  </div>
                  <span className="text-lg">{opt}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col items-center gap-4">
        {!isRevealed ? (
          <button
            disabled={!selectedOption}
            onClick={handleReveal}
            className="w-full py-4 rounded-xl bg-primary disabled:bg-surface-hover disabled:text-text-muted hover:bg-primary-hover text-white font-bold text-lg transition-colors shadow-lg disabled:shadow-none"
          >
            Check Answer
          </button>
        ) : (
          <div className="w-full space-y-4 animate-fade-in">
            <div className={`p-4 rounded-xl border text-center ${isCorrect ? "bg-green-500/10 border-green-500/30 text-green-400" : "bg-red-500/10 border-red-500/30 text-red-400"}`}>
              <h3 className="font-bold text-xl mb-1">{isCorrect ? "Correct!" : "Incorrect"}</h3>
              <p className="text-sm">The answer is: <strong>{question.correctAnswer}</strong></p>
            </div>
            
            {/* Interactive Video Walkthrough */}
            {question.videoUrl && (
              <div className="w-full rounded-xl overflow-hidden border border-blue-500/30 bg-surface">
                <div className="bg-blue-500/20 px-4 py-2 flex items-center gap-2">
                  <span className="text-blue-400">📺</span>
                  <span className="text-sm font-bold text-blue-100">Video Walkthrough</span>
                </div>
                <div className="aspect-video w-full">
                  <iframe 
                    src={question.videoUrl} 
                    className="w-full h-full" 
                    allowFullScreen
                    title="Video Explanation"
                  />
                </div>
              </div>
            )}
            
            <div className="glass-panel p-6 border-blue-500/30 bg-blue-900/10">
              <h4 className="text-center text-white font-bold mb-4">How hard was it to remember this?</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button 
                  disabled={isSubmitting}
                  onClick={() => handleSM2Rating(5)} 
                  className="p-3 rounded-lg bg-surface hover:bg-surface-hover border border-border flex flex-col items-center gap-1 group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">😎</span>
                  <span className="text-xs text-text-muted font-bold uppercase">Perfect</span>
                </button>
                <button 
                  disabled={isSubmitting}
                  onClick={() => handleSM2Rating(4)} 
                  className="p-3 rounded-lg bg-surface hover:bg-surface-hover border border-border flex flex-col items-center gap-1 group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">🤔</span>
                  <span className="text-xs text-text-muted font-bold uppercase">Hesitated</span>
                </button>
                <button 
                  disabled={isSubmitting}
                  onClick={() => handleSM2Rating(2)} 
                  className="p-3 rounded-lg bg-surface hover:bg-surface-hover border border-border flex flex-col items-center gap-1 group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">😓</span>
                  <span className="text-xs text-text-muted font-bold uppercase">Hard</span>
                </button>
                <button 
                  disabled={isSubmitting}
                  onClick={() => handleSM2Rating(0)} 
                  className="p-3 rounded-lg bg-surface hover:bg-surface-hover border border-border flex flex-col items-center gap-1 group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">😵</span>
                  <span className="text-xs text-text-muted font-bold uppercase">Blackout</span>
                </button>
              </div>
              <p className="text-xs text-center text-text-muted mt-4">
                This rating optimizes the Spaced Repetition (SM-2) algorithm to schedule your next review.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
