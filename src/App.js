import React from "react";
import Question from "./Question";
import { nanoid } from 'nanoid';

export default function App() {

  const [showQuiz, setShowQuiz] = React.useState(false);
  const [allQuestions, setAllQuestions] = React.useState([]);
  const [checkingAnswers, setCheckingAnswers] = React.useState(false);
  const [newGame, setNewGame] = React.useState(false);

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10&type=multiple")
    .then(res => res.json())
    .then(questionsData => {
      const questions = questionsData.results;
      questions.forEach(question => 
        {
          question.id = nanoid();
          question.correctAnswer = question.correct_answer;
          question.allAnswers = [...question.incorrect_answers, question.correct_answer];
          shuffleArray(question.allAnswers);
        })
      setAllQuestions(questions);
    }
    );
  }, [newGame])

  // Fisher-Yates shuffle algorithm to randomly shuffle the elements
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  const questionElements = allQuestions.map(question => {
    return (
    <Question 
      key={question.id} 
      title={question.question} 
      correctAnswer={question.correctAnswer} 
      allAnswers={question.allAnswers}
      checkingAnswers={checkingAnswers}
      />
  )})

  function startQuiz() {
    setShowQuiz(prevShowQuiz => !prevShowQuiz);
  }

  function checkAnswers() {
    setCheckingAnswers(prevCheckingAnswers => !prevCheckingAnswers);
    goToTop();
  }

  function playAgain() {
    checkAnswers();
    setNewGame(prevNewGame => !prevNewGame);
  }

  function goToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  return(
    <main>
      <svg className="blob blob--yellow" xmlns="http://www.w3.org/2000/svg" width="297" height="235" viewBox="0 0 158 141" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M63.4095 81.3947C35.1213 50.8508 -2.68211 21.7816 1.17274 -19.6933C5.43941 -65.599 39.854 -105.359 82.4191 -123.133C122.797 -139.994 170.035 -130.256 205.822 -105.149C235.947 -84.0141 236.823 -43.8756 246.141 -8.27104C256.17 30.0508 282.521 70.8106 260.501 103.779C237.538 138.159 188.991 143.432 147.931 138.768C112.318 134.723 87.7505 107.677 63.4095 81.3947Z" fill="#FFFAD1"/>
      </svg>
      {!showQuiz && <div className="menu">
        <h1 className="menu__title">Quizzical</h1>
        <p className="menu__description">How much can you score in this trivia quiz?</p>
        <button className="button" onClick={startQuiz}>Start quiz</button>
      </div>}
      {showQuiz && <div className="quiz">
        {questionElements}
        {!checkingAnswers && <button className="button" onClick={checkAnswers}>Check answers</button>}
        {checkingAnswers && <div>
          <h4>{`You scored x/${questionElements.length} correct answers`}</h4>
          <button className="button" onClick={playAgain}>Play again</button>
        </div>}
      </div>}
      <svg className="blob blob--green" xmlns="http://www.w3.org/2000/svg" width="297" height="235" viewBox="0 0 148 118" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M-5.55191 4.90596C35.9614 1.77498 82.2425 -9.72149 112.306 19.1094C145.581 51.0203 155.282 102.703 142.701 147.081C130.767 189.18 93.7448 220.092 51.8208 232.476C16.5281 242.902 -15.4332 218.605 -49.1007 203.738C-85.3375 187.737 -133.641 182.993 -145.741 145.239C-158.358 105.868 -132.269 64.5881 -103.064 35.3528C-77.7328 9.99541 -41.2727 7.60006 -5.55191 4.90596Z" fill="#DEEBF8"/>
      </svg>
    </main>
  )
}