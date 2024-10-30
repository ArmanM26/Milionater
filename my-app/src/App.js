import React, { useState } from "react";
import Question from "./Question";
import Score from "./Score";
import Result from "./Result";
import questions from "./questions"; // Import questions
import "./styles.css"; // Import the CSS styles

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="app-container">
      {showResult ? (
        <Result score={score} />
      ) : (
        <>
          <Score score={score} />
          {/* Ensure currentQuestion is valid before rendering */}
          {questions[currentQuestion] && (
            <Question
              data={questions[currentQuestion]}
              onAnswer={handleAnswer}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
