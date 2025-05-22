import React, { useEffect, useRef, useState } from 'react';
import "./game.css"
import gsap from 'gsap';
const choices = ['rock', 'paper', 'scissors'];

const getResult = (user, computer) => {
  if (user === computer) return 'draw';
  if (
    (user === 'rock' && computer === 'scissors') ||
    (user === 'scissors' && computer === 'paper') ||
    (user === 'paper' && computer === 'rock')
  ) return 'win';
  return 'lose';
};

const RockPaperScissors = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');
  const [score, setScore] = useState({ user: 0, computer: 0 });

  const handleChoice = (choice) => {
    const computer = choices[Math.floor(Math.random() * choices.length)];
    const gameResult = getResult(choice, computer);

    setUserChoice(choice);
    setComputerChoice(computer);
    setResult(gameResult);

    if (gameResult === 'win') {
      setScore((prev) => ({ ...prev, user: prev.user + 1 }));
    } else if (gameResult === 'lose') {
      setScore((prev) => ({ ...prev, computer: prev.computer + 1 }));
    }
  };
const titleRef = useRef(null);
const resultRef = useRef(null);
const buttonsRef = useRef([]);
const winRef = useRef(null);


useEffect(() => {
  gsap.from(titleRef.current, {
    duration: 1,
    y: -50,
    opacity: 0,
    ease: 'bounce'
  });

  gsap.from(buttonsRef.current, {
    duration: 0.6,
    opacity: 0,
    y: 20,
    stagger: 0.2
  });
}, []);

useEffect(() => {
  if (result) {
    gsap.from(resultRef.current, {
      duration: 0.5,
      scale: 0.8,
      opacity: 0,
       yoyo: true,
      ease: 'back.out(1.7)'
    });
  }
}, [result]);
useEffect(() => {
  if (result === 'win' && winRef.current) {
    gsap.fromTo(winRef.current, 
      { scale: 0.8, opacity: 0 },
      {
        scale: 1.2,
        opacity: 1,
        color: "#00FF00",
        duration: 0.6,
        ease: "elastic.out(1, 0.3)"
      }
    );
  }
}, [result]);

useEffect(() => {
  if (result === 'win' && winRef.current) {
    gsap.fromTo(winRef.current, 
      { scale: 0.8, opacity: 0 },
      {
        scale: 1.2,
        opacity: 1,
        color: "#00FF00",
        duration: 0.6,
        ease: "elastic.out(1, 0.3)"
      }
    );
  }
}, [result]);


  return (
   <div style={{backgroundImage:"url(https://i.ytimg.com/vi/raDpbeLQUM8/maxresdefault.jpg)"}} id='card'>

     <div style={{ textAlign: 'center', fontFamily: 'Arial',marginTop:'100px' }}>
      <h1 style={{color:'rgb(227, 240, 230)',fontSize:"30px"}} >Rock Paper Scissors</h1>
      <div style={{marginTop:"80px"}}>
        {choices.map((choice) => (
          <button  key={choice} onClick={() => handleChoice(choice)} style={{ margin: '10px', padding: '10px 20px',backgroundColor:"red" }}>
            {choice.charAt(0).toUpperCase() + choice.slice(1)}
          </button>
        ))}
      </div>

      {result && (
        <div ref={resultRef}>
          <p  style={{color:'rgb(11, 244, 11)',marginTop:"20px"}}>You chose: <strong>{userChoice}</strong></p>
          <p  style={{color:'rgb(21, 234, 56)'}}>Computer chose: <strong>{computerChoice}</strong></p>
        <h2
  ref={result === 'win' ? winRef : null}
  style={{ color: "rgb(248, 248, 248)" }}
>
  {result === 'draw' ? "It's a Draw!" : result === 'win' ? "You Win!" : "You Lose!"}
</h2>

        </div>
      )}

      <h3 style={{color:'rgb(242, 246, 243)'}}>Score</h3>
      <p style={{color:'rgb(243, 246, 243)'}}>You: {score.user} | Computer: {score.computer}</p>
      <button onClick={() => {
        setUserChoice(null);
        setComputerChoice(null);
        setResult('');
      }}>Play Again</button>
    </div>
   </div>
  );
};

export default RockPaperScissors;
