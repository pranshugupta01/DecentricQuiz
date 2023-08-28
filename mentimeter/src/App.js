import "./App.css";
import StartPage from "./Components/StartPage.js";
import QuizPage from "./Components/QuizPage.js";
import ResultPage from "./Components/ResultPage.js";
import { useState } from "react";
import { PageContext } from "./Users/Contexts.js";


function Menti() {
  const [pageState, setPageState] = useState("Start");
  const [score, setScore] = useState(0);

  return (
    <div className="Menti">
      <h1>MentiMeter</h1>
      <PageContext.Provider
        value={{
          pageState,
          setPageState,
          score,
          setScore,
        }}
      >
        {pageState === "Start" && <StartPage />}
        {pageState === "Quiz" && <QuizPage />}
        {pageState === "Result" && <ResultPage />}
      </PageContext.Provider>
    </div>
  );
}

export default Menti;