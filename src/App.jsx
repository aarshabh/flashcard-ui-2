import React, { useState, useEffect } from 'react';
import Card from './Card';
import './App.css';

const cardData = [
  { question: "What is React?", answer: "A JavaScript library for building user interfaces." },
  { question: "What is a component?", answer: "A reusable, self-contained piece of UI." },
  { question: "What is a hook?", answer: "A function that lets you use state and other React features in function components." },
  { question: "What does useState() do?", answer: "It declares a state variable." },
  { question: "What is JSX?", answer: "A syntax extension for JavaScript." }
];

const shuffleArray = (array) => {
  let newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

function App() {
  const [shuffledCards, setShuffledCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  useEffect(() => {
    setShuffledCards(shuffleArray(cardData));
  }, []);

  const handleSubmit = () => {
    const currentCard = shuffledCards[currentCardIndex];
    const correct = userAnswer.trim().toLowerCase() === currentCard.answer.toLowerCase();
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) {
        setBestStreak(newStreak);
      }
    } else {
      setStreak(0);
    }
  };

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % shuffledCards.length);
    setUserAnswer('');
    setShowResult(false);
    setIsCorrect(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !showResult && userAnswer.trim()) {
      handleSubmit();
    }
  };

  if (shuffledCards.length === 0) {
    return <div>Loading...</div>;
  }

  const currentCard = shuffledCards[currentCardIndex];

  return (
    <div className="App">
      <header className="app-header">
        <h1>React Flashcards</h1>
        <p>A simple app to help you learn some React basics!</p>
        <div className="stats-container">
          <p>Total cards: {cardData.length}</p>
          <p className="streak">Current Streak: <strong>{streak}</strong> 🔥</p>
          <p className="best-streak">Best Streak: <strong>{bestStreak}</strong> ⭐</p>
        </div>
      </header>
      
      <main className="card-container">
        <p className="card-counter">Card {currentCardIndex + 1} of {shuffledCards.length}</p>
        <Card question={currentCard.question} answer={currentCard.answer} />
        
        <div className="answer-section">
          <label htmlFor="user-answer">Your Answer:</label>
          <input
            id="user-answer"
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your answer here..."
            disabled={showResult}
            className="answer-input"
          />
          
          {showResult && (
            <div className={`result ${isCorrect ? 'correct' : 'incorrect'}`}>
              <p className="result-message">
                {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
              </p>
              {!isCorrect && (
                <p className="correct-answer">The correct answer is: {currentCard.answer}</p>
              )}
            </div>
          )}
          
          {!showResult && (
            <button
              onClick={handleSubmit}
              disabled={!userAnswer.trim()}
              className="check-button"
            >
              Check Answer
            </button>
          )}
        </div>
      </main>
      
      <footer className="app-footer">
        <button className="next-button" onClick={handleNextCard}>
          Next Card
        </button>
      </footer>
    </div>
  );
}

export default App;