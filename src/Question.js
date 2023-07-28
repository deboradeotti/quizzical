import React from "react"
import { nanoid } from 'nanoid';
import parse from 'html-react-parser';

function Question(props) {
  const [selectedAnswer, setSelectedAnswer] = React.useState("");

  const correctAnswer = props.correctAnswer;
  const allAnswers = props.allAnswers;

  const answerElements = allAnswers.map(answer => 
    { return (
    <div className="question__options--option" key={nanoid()}>
      <input 
        type="radio" 
        name={props.title} 
        id={answer}
        value={answer} 
        className={`option-input ${props.checkingAnswers && answer === correctAnswer ? "correct" : (props.checkingAnswers && answer !== correctAnswer ? "incorrect" : "")}`}
        checked={selectedAnswer === answer}
        onChange={handleChange}
      />
      <label htmlFor={answer}>{parse(answer)}</label>
    </div>
    )}
  )

  function handleChange(event) {
    setSelectedAnswer(event.target.value);
  }

  return(
    <div className="question">
      <h3 className="question__title">{parse(props.title)}</h3>
      <div className={`question__options`}>
        {answerElements}
      </div>
    </div>
  )
}

export default React.memo(Question);