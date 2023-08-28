// SPDX-License-Identifier: MIT
// pragma solidity >=0.4.0 <0.9.0;
pragma solidity ^0.8.9;

contract Quiz {
      uint public score;
      struct CurrentQuestion {
        string questionName;
        string option1name;
        string option2name;
        string option3name;
        string option4name;
    }

   CurrentQuestion[] public questions;

    function createCurrentQuestion(string calldata _questionName, string calldata _option1name, string calldata _option2name, string calldata _option3name, string calldata _option4name) public {
        questions.push(CurrentQuestion(_questionName, _option1name, _option2name, _option3name, _option4name));
    }
   
    function GetCurrentQuizQuestions() public view returns (CurrentQuestion[] memory) {
        return questions;
    }
    
    function getQuestion(uint i) public view returns (CurrentQuestion memory) {
        return questions[i];
    }



      function calculateResult(string[] memory ansArr, string[] memory optionArr) public returns(uint) {
        score = 0;
        require(ansArr.length == optionArr.length, "Something went wrong! Contact Developer!");
        for (uint i = 0; i < ansArr.length; i++) {
            if (keccak256(abi.encodePacked(ansArr[i])) == keccak256(abi.encodePacked(optionArr[i]))) {
                score = score + 1;
                continue;
            }
        }
        return score;
     }

      function getScore() public view returns (uint) {
        return score;
    }


}