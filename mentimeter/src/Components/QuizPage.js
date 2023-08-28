import "../App.css";
import { Questions } from "../Users/Questions.js";
import { useState } from "react";

import { useContext } from "react";
import { PageContext } from "../Users/Contexts.js";
import QuizABI from "../artifacts/contracts/Quiz.sol/Quiz.json"
import { ethers } from 'ethers';

function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [optionChosen, setOptionChosen] = useState("");
  const [ansArr, setansArr] = useState([]);
  const [userOptionArr, setUserOption] = useState([]);
  const [answer, setAnswer] = useState(null)
  const contractAdd = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const { score, setScore, setPageState } = useContext(PageContext);

  const chooseOption = (option) => {
    setOptionChosen(option);
  };

  const createArray = (answer, option) => {
    setansArr((prevAns) => [...prevAns, answer]);
    setUserOption((prevOption) => [...prevOption, option]);
  }

  const nextQuestion = () => { 
    createArray(Questions[currentQuestion].answer, optionChosen);
    if (Questions[currentQuestion].answer === optionChosen) {
      setScore(score + 1);
    }
    setCurrentQuestion(currentQuestion + 1);
  };

  async function fetchScore() {
    if(typeof window.ethereum !== 'undefined') {
     const provider = new ethers.providers.Web3Provider(window.ethereum);
     const contract = new ethers.Contract(contractAdd, QuizABI.abi, provider);
     try {
       const data = await contract.getScore();
       const _answer = await data.toNumber();
       setAnswer(_answer);
     } catch(err) {
       console.log(err);
     }
    }
 }

 async function requestAccount() {
  await window.ethereum.request({ method: 'eth_requestAccounts' });
}


  const finishQuiz = () => {
    async function set() {
      if(typeof window.ethereum !== 'undefined' ) {
        await requestAccount();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAdd, QuizABI.abi, signer);
        const transaction = await contract.calculateResult(ansArr, userOptionArr);
        await transaction.wait();
        // fetchScore();
      }
    }
    set();
    
  };


  return (
    <div className="Quiz">
      <h1>{Questions[currentQuestion].ques}</h1>
      <div className="questions">
        <button
          onClick={() => {
            chooseOption("optionA");
          }}
        >
          {Questions[currentQuestion].optionA}
        </button>
        <button
          onClick={() => {
            chooseOption("optionB");
          }}
        >
          {Questions[currentQuestion].optionB}
        </button>
        <button
          onClick={() => {
            chooseOption("optionC");
          }}
        >
          {Questions[currentQuestion].optionC}
        </button>

        <button
          onClick={() => {
            chooseOption("optionD");
          }}
        >
          {Questions[currentQuestion].optionD}
        </button>
      </div>

      {currentQuestion === Questions.length - 1 ? (
        <button onClick={finishQuiz} id="nextQuestion">
          Calculate Result
        </button>
      ) : (
        <button onClick={nextQuestion} id="nextQuestion">
          Next
        </button>
      )}
    </div>
  );
}

export default QuizPage;
