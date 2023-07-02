const inOut = document.querySelector("#in-out");
const historique = document.querySelector("#historique");
const buttons = [...document.querySelectorAll("button")];
const operators = /-|\+|\*|\//;
const brackets = /\(|\)/;
const mathExpressions = /-|\+|\*|\/|\(|\)/;

const insertZero = () => {
  inOut.innerText += "0";
};
const insertMultiplicator = () => {
  inOut.innerText += "*";
};
const removeLastCaracter = (oldExpression, lastCaracterIndex) => {
  inOut.innerText = oldExpression.slice(0, lastCaracterIndex);
};

const isInputValid = (oldExpression, buttonValue) => {
  const lastCaracterIndex = oldExpression.length - 1;
  const lastCaracter = oldExpression[lastCaracterIndex];
  const isLastCaracterAnOperator = operators.test(lastCaracter);
  const isLastCaracterALeftBracket = lastCaracter === "(";
  const isLastCaracterADot = lastCaracter === ".";
  const isLastCaracterAMathExpressions = mathExpressions.test(lastCaracter);
  const isButtonValueAnOperator = operators.test(buttonValue);
  const isButtonValueABracket = brackets.test(buttonValue);

  if (buttonValue === ".") {
    return dotController(
      oldExpression,
      lastCaracter,
      isLastCaracterAMathExpressions
    );
  }

  if (isButtonValueAnOperator) {
    return operatorsController(
      oldExpression,
      isLastCaracterALeftBracket,
      isLastCaracterAnOperator,
      lastCaracterIndex,
      isLastCaracterADot,
      buttonValue
    );
  }

  if (isButtonValueABracket) {
    return bracketsController(
      oldExpression,
      isLastCaracterAnOperator,
      isLastCaracterALeftBracket,
      isLastCaracterAMathExpressions,
      isLastCaracterADot,
      lastCaracterIndex,
      buttonValue,
      lastCaracter
    );
  }
  lastCaracter === ")" && insertMultiplicator();
  return !(oldExpression === "0");
};

const displayOnScreen = (e) => {
  const value = e.target.innerText;
  if (isInputValid(inOut.innerText, value)) {
    inOut.innerText += value;
  }
};

function calculate(e) {
  const lastCaracter = inOut.innerText[inOut.innerText.length - 1];
  const leftBracketCount = inOut.innerText
    .split("")
    .filter((x) => x === "(").length;
  const rightBracketCount = inOut.innerText
    .split("")
    .filter((x) => x === ")").length;
  if (rightBracketCount < leftBracketCount) {
    inOut.innerText += ")".repeat(leftBracketCount - rightBracketCount);
  }

  if (operators.test(lastCaracter)) {
    const lastCaracterIndex = inOut.innerText.length - 1;
    const newExpression = inOut.innerText.slice(0, lastCaracterIndex);
    console.log(newExpression);
    inOut.innerText += eval(newExpression);
  }
  if (inOut.innerText.slice(-2) === "()") {
    inOut.innerText = inOut.innerText.slice(0, -3);
  }
  if (!inOut.innerText) {
    inOut.innerText += "0";
  }
  const result = eval(inOut.innerText);
  historique.innerText = inOut.innerText + " =";
  inOut.innerText = result;
}
function cleanScreen(e) {
  inOut.innerText = "";
  historique.innerText = "";
}
buttons
  .filter((button) => !["C", "="].includes(button.innerText))
  .forEach((button) =>
    button.addEventListener("click", (e) => displayOnScreen(e))
  );

const buttonsFunction = (str, callback) => {
  buttons
    .filter((button) => button.innerText === str)
    .forEach((button) => button.addEventListener("click", (e) => callback(e)));
};

buttonsFunction("C", cleanScreen);
buttonsFunction("=", calculate);

window.addEventListener("keydown", (e) => {
  if (/[0-9]|-|\.|\+|\*|\/|\(|\)/.test(e.key)) {
    const value = e.key;
    if (isInputValid(inOut.innerText, value)) {
      inOut.innerText += value;
    }
  } else if (e.key === "Enter") {
    calculate();
  } else if (e.key === "Backspace") {
    const testTbl = inOut.innerText.split("");
    testTbl.pop();
    inOut.innerText = testTbl.join("");
  } else if (e.key === "Delete") {
    cleanScreen();
  }
});
