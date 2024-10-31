// Home.js
import React, { useState } from "react";
import questions from "../questions/questions";
import money from "../money/money";
import Score from "../score/Score";
import "./home.css";

const Home = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0); // State to track the current question index
  const [showResult, setShowResult] = useState(false); // State to determine if the result should be shown
  const [score, setScore] = useState(0); // State to track the user's score

  // Function to handle answer selection
  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestion].correct) {
      setScore(score + 1); // Increment score if the answer is correct
    }
    // Move to the next question or show the result if it's the last question
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1); // Move to the next question
    } else {
      setShowResult(true); // Show result if there are no more questions
    }
  };

  // Function to restart the quiz
  const onRestart = () => {
    setCurrentQuestion(0); // Reset to the first question
    setScore(0); // Reset score
    setShowResult(false); // Hide result
  };

  return (
    <>
      {!showResult ? (
        <div className="question-container">
          <h2>{questions[currentQuestion].question}</h2>{" "}
          {/* Displaying the question */}
          <div className="answers">
            {questions[currentQuestion].answers.map((answer, index) => (
              <button key={index} onClick={() => handleAnswer(answer)}>
                {answer} {/* Displaying each answer as buttons */}
              </button>
            ))}
          </div>
          <div className="score">Score: {score}</div>{" "}
          {/* Displaying the current score */}
          <div className="prize">
            Current Prize: ${money[currentQuestion]}{" "}
            {/* Displaying current prize amount */}
          </div>
        </div>
      ) : (
        <div className="result">
          <Score score={score} onRestart={onRestart} />{" "}
          {/* Displaying the Score component */}
        </div>
      )}
    </>
  );
};

export default Home; // Exporting the Home component
