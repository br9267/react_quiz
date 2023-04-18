
import React, { useEffect, useState } from 'react'
import "./game.css";
function Board({data,questionNumber}) {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    setQuestion(data[questionNumber-1]);
  },[data,questionNumber])

 
  return (
    <>
    <div className="quiz-container">
  <div className="question-container"><h1 className="question">{question?.question_text}</h1></div>
  <div className="answers-container">
    <div className="answer" id="answer1">
    <button className="answer-button" onClick={() =>  !selectedAnswer}>{question?.option_a}</button>
  </div>
  <div className="answer" id="answer2">
    <button className="answer-button">{question?.option_b}</button>
  </div>
  <div className="answer" id="answer3">
    <button className="answer-button">{question?.option_c}</button>
  </div>
  <div className="answer" id="answer4">
    <button className="answer-button">{question?.option_d}</button>
  </div>
    </div>
  </div>
    </>
  )
}

export default Board
