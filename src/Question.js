import React from "react"

export default function Question(props) {
  const correctAnswer = props.correctAnswer;
  const incorrectAnswers = props.incorrectAnswers;
  const allAnswers = [...incorrectAnswers, correctAnswer]

  // Fisher-Yates shuffle algorithm to randomly shuffle the elements
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  shuffleArray(allAnswers);

  const answerElements = allAnswers.map(answer => 
    <h4 className="question__options--option">{answer}</h4>
  )

  return(
    <div className="question">
      <h3 className="question__title">{props.title}</h3>
      <div className="question__options">
        {answerElements}
      </div>
    </div>
  )
}