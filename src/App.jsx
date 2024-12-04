import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [display, setDisplay] = useState("0");
  const [evaluated, setEvaluated] = useState(false);

  const clearDisplay = () => {
    setDisplay("0");
    setEvaluated(false);
  };

  const appendNumber = (number) => {
    if (evaluated) {
      setDisplay(number);
      setEvaluated(false);
    } else if (display === "0") {
      setDisplay(number);
    } else {
      setDisplay(display + number);
    }
  };

  const appendOperator = (operator) => {
    if (evaluated) {
      setDisplay(display + operator);
      setEvaluated(false);
    } else {
      const lastChar = display.slice(-1);

      
      if (/[+\-*/]/.test(lastChar)) {
        
        if (operator === "-" && !/[+\-*/]/.test(display.slice(-2, -1))) {
          setDisplay(display + operator);
        } else {
          
          setDisplay(display.replace(/[*\/+\-]+$/, operator));
        }
      } else {
        setDisplay(display + operator);
      }
    }
  };

  const appendDecimal = () => {
    const currentNumber = display.split(/[\+\-\*\/]/).pop();
    if (!currentNumber.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const calculate = () => {
    try {
     
      const sanitizedExpression = display.replace(/[*\/+\-]+$/, "");
      const result = eval(sanitizedExpression);
      setDisplay(result.toFixed(4).replace(/\.?0+$/, "")); 
      setEvaluated(true);
    } catch {
      setDisplay("Error");
    }
  };

  return (
    <div className="calculator">
      <div id="display" className="display">
        {display}
      </div>
      <div className="buttons">
        <button id="clear" onClick={clearDisplay}>
          AC
        </button>
        <button id="divide" onClick={() => appendOperator("/")}>
          ÷
        </button>
        <button id="multiply" onClick={() => appendOperator("*")}>
          ×
        </button>
        <button id="seven" onClick={() => appendNumber("7")}>
          7
        </button>
        <button id="eight" onClick={() => appendNumber("8")}>
          8
        </button>
        <button id="nine" onClick={() => appendNumber("9")}>
          9
        </button>
        <button id="subtract" onClick={() => appendOperator("-")}>
          −
        </button>
        <button id="four" onClick={() => appendNumber("4")}>
          4
        </button>
        <button id="five" onClick={() => appendNumber("5")}>
          5
        </button>
        <button id="six" onClick={() => appendNumber("6")}>
          6
        </button>
        <button id="add" onClick={() => appendOperator("+")}>
          +
        </button>
        <button id="one" onClick={() => appendNumber("1")}>
          1
        </button>
        <button id="two" onClick={() => appendNumber("2")}>
          2
        </button>
        <button id="three" onClick={() => appendNumber("3")}>
          3
        </button>
        <button id="equals" onClick={calculate}>
          =
        </button>
        <button id="zero" onClick={() => appendNumber("0")} className="zero">
          0
        </button>
        <button id="decimal" onClick={appendDecimal}>
          .
        </button>
      </div>
    </div>
  );
};

export default App;
