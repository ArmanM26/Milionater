import React, { useState } from "react";
import questions from "./questions/questions"; // Importing the questions for the quiz
import money from "./money/money"; // Importing prize amounts
import Question from "./questions/Question"; // Importing the Question component
import "./styles.css"; // Importing styles
import Score from "./score/Score"; // Importing the Score component
import Register from "./register"; // Importing the Register component
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; // Importing routing components

const App = () => {
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
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true); // Show result if no more questions
    }
  };

  // Restart function to reset the quiz
  const onRestart = () => {
    setCurrentQuestion(0); // Reset to the first question
    setScore(0); // Reset score
    setShowResult(false); // Hide result
  };

  return (
    <div className="app-container">
      <Router>
        <nav>
          <Link to="/">Home</Link> | {/* Link to the main game page */}
          <Link to="/register">Register</Link>{" "}
          {/* Link to the registration page */}
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              !showResult ? (
                <>
                  <Question
                    data={questions[currentQuestion]} // Passing current question data
                    onAnswer={handleAnswer} // Passing the answer handler
                  />
                  <div className="score">Score: {score}</div>{" "}
                  {/* Display current score */}
                  <div className="prize">
                    Current Prize: ${money[currentQuestion]}{" "}
                    {/* Display current money prize */}
                  </div>
                </>
              ) : (
                <div className="result">
                  <Score score={score} onRestart={onRestart} />{" "}
                  {/* Display the Score component */}
                </div>
              )
            }
          />

          {/* Registration page */}
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App; // Exporting the App component
