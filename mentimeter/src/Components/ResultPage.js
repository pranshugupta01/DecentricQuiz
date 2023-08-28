import React, { useEffect, useState } from "react";
import "../App.css";
import { useContext } from "react";
import { PageContext } from "../Users/Contexts.js";
import { Questions } from "../Users/Questions.js";
import QuizABI from "../artifacts/contracts/Quiz.sol/Quiz.json"
import { ethers } from 'ethers';

const ResultPage = () => {
  const { score, setScore, setPageState } = useContext(
    PageContext
  );
  const [answer, setAnswer] = useState(null);
  const contractAdd = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

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

 useEffect(() => {
  fetchScore();
 },[])

  const restartQuiz = () => {
    setScore(0);
    setPageState("Start");
  };
  return (
    <div className="Result">
      <h1>Your Score Is : :</h1>
      <h1>
        {answer} / {Questions.length}
      </h1>
      <button onClick={restartQuiz}>Retry</button>
    </div>
  );
};

export default ResultPage;