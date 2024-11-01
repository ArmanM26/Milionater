// Home.js
import React, { useState } from "react";
import questions from "../questions/questions";
import money from "../money/money";
import Score from "../score/Score";
import "./home.css";

const Home = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [currentPrize, setCurrentPrize] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // State to track selected answer index
  const [isCorrect, setIsCorrect] = useState(null); // State to track if the selected answer is correct

  const handleAnswer = (answer, index) => {
    setSelectedAnswer(index); // Set the selected answer index

    if (answer === questions[currentQuestion].correct) {
      setIsCorrect(true); // Mark as correct
      setScore(score + 1);

      if (currentQuestion < questions.length - 1) {
        setCurrentPrize(currentPrize + money[currentQuestion + 1]);
      } else {
        setCurrentPrize(currentPrize + money[currentQuestion]);
      }

      setTimeout(() => {
        setSelectedAnswer(null);
        setIsCorrect(null);
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          setShowResult(true);
        }
      }, 1000); // Move to the next question after a delay
    } else {
      setIsCorrect(false); // Mark as incorrect

      setTimeout(() => {
        onRestart(); // Restart the game if answer is wrong
      }, 1000); // Delay to show correct and incorrect colors before restart
    }
  };

  const onRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setCurrentPrize(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  return (
    <>
      {!showResult ? (
        <div className="question-container">
          <h2>{questions[currentQuestion].question}</h2>
          <div className="answers">
            {questions[currentQuestion].answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(answer, index)}
                className={
                  selectedAnswer === index
                    ? isCorrect
                      ? "correct"
                      : "incorrect"
                    : selectedAnswer !== null &&
                      answer === questions[currentQuestion].correct
                    ? "correct"
                    : ""
                }
              >
                {String.fromCharCode(65 + index)}: {answer}
              </button>
            ))}
          </div>
          <div className="score">Score: {score}</div>
          <div className="prize">Current Prize: ${currentPrize}</div>
        </div>
      ) : (
        <div className="result">
          <Score score={score} onRestart={onRestart} />
        </div>
      )}
    </>
  );
};

export default Home;
