import React from "react"
import { nanoid } from 'nanoid';
import parse from 'html-react-parser';

export default function Question(props) {
  const [selectedAnswer, setSelectedAnswer] = React.useState("");

  const correctAnswer = props.correctAnswer;
  const incorrectAnswers = props.incorrectAnswers;
  const allAnswers = [...incorrectAnswers, correctAnswer];

  // Fisher-Yates shuffle algorithm to randomly shuffle the elements
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  React.useEffect(() => {
    shuffleArray(allAnswers);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const answerElements = allAnswers.map(answer => 
    <div className="question__options--option" key={nanoid()}>
      <input 
        type="radio" 
        name={props.title} 
        id={answer}
        value={answer} 
        className="option-input"
        checked={selectedAnswer === answer}
        onChange={handleChange} 
      />
      <label htmlFor={answer}>{parse(answer)}</label>
    </div>
  )

  function handleChange(event) {
    setSelectedAnswer(event.target.value);
  }

  return(
    <div className="question">
      <h3 className="question__title">{parse(props.title)}</h3>
      <div className="question__options">
        {answerElements}
      </div>
    </div>
  )
}