import React from "react";

const Question = ({ data, onAnswer }) => {
  return (
    <div>
      <h2>{data.question}</h2>
      {data.answers.map((answer) => (
        <button key={answer} onClick={() => onAnswer(answer)}>
          {answer}
        </button>
      ))}
    </div>
  );
};

export default Question;
