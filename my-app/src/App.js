import React, { useState } from "react";
import Question from "./Question";
import Score from "./Score";
import Result from "./Result";

const questions = [
  {
    question:
      "What programming language is primarily used for web development?",
    answers: ["Python", "JavaScript", "Java", "C#"],
    correct: "JavaScript",
  },
  // add more questions similarly
];

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
    <div>
      {showResult ? (
        <Result score={score} />
      ) : (
        <>
          <Score score={score} />
          <Question data={questions[currentQuestion]} onAnswer={handleAnswer} />
        </>
      )}
    </div>
  );
}

export default App;
