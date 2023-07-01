/* const historique = document.querySelector("#historique");
const inOut = document.querySelector("#in-out");
const reset = document.querySelector("#C");
const equal = document.querySelector("#egale");

const numbers = document.querySelectorAll(".numbers");

const operators = document.querySelectorAll(".operators");

function cleanScreen() {
  historique.innerHTML = "";
  inOut.innerHTML = "";
}

reset.addEventListener("click", cleanScreen);
equal.addEventListener("click", () => {
  let test = document.querySelector("#in-out");
  console.log(test.innerHTML);
  calculate(test.innerHTML);
});

function pressButton(buttons) {
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const value = event.target.innerHTML;
      const currentValue = inOut.innerHTML;
      const newValue = currentValue + value;
      inOut.innerHTML = newValue;
    });
  });
}

window.addEventListener("keydown", (e) => {
  let test = document.querySelector("#in-out");
  if (/[0-9]|-|\.|\+|\*|\/|\(|\)/.test(e.key)) {
    const value = e.key;
    const currentValue = inOut.innerHTML;
    const newValue = currentValue + value;
    inOut.innerHTML = newValue;
  } else if (e.key === "Enter") {
    calculate(test.innerHTML);
  } else if (e.key === "Backspace") {
    const testTbl = test.innerHTML.split("");
    testTbl.pop();
    test.innerHTML = testTbl.join("");
  } else if (e.key === "Delete") {
    cleanScreen();
  }
});
function calculate(str) {
  const expression = str.split("");

  const newExpression = expression.map((e) => {
    return /[0-9]/.test(e) ? parseInt(e) : e;
  });
  for (let i = 0; i < newExpression.length; i++) {
    if (newExpression[i] === "(" && typeof newExpression[i - 1] === "number") {
      newExpression.splice(i, 0, "*");
    }
  }

  console.log(newExpression);
  const result = eval(newExpression.join(""));
  historique.innerHTML = str + " = " + result + "<br>";
  inOut.innerHTML = result; */
/*  try {
    const result = eval(newExpression.join(""));
    historique.innerHTML = str + " = " + result + "<br>";
    inOut.innerHTML = result;
  } catch {
    historique.innerHTML = "Expression incorrect";
  } */
/* }
pressButton(numbers);
pressButton(operators); */
const inOut = document.querySelector("#in-out");
const buttons = document.querySelectorAll("button");
const operators = /-|\+|\*|\//;
const brackets = /\(|\)/;
const allOperators = /-|\+|\*|\/|\(|\)/;

const dotController = (oldExpression, lastCaracter) => {
  const currentNumbers = oldExpression.split(allOperators);
  const lastNumber = currentNumbers[currentNumbers.length - 1];
  if (lastNumber.includes(".") || lastCaracter === ")") {
    return false;
  } else {
    if (!oldExpression || allOperators.test(lastCaracter)) {
      inOut.innerText += "0";
    }
    return true;
  }
};

const isInputValid = (oldExpression, buttonValue) => {
  const lastCaracterIndex = oldExpression.length - 1;
  const lastCaracter = oldExpression[lastCaracterIndex];

  if (operators.test(buttonValue) && (!oldExpression || lastCaracter === "(")) {
    inOut.innerText += "0";
  } else if (operators.test(lastCaracter)) {
    inOut.innerText = oldExpression.slice(0, lastCaracterIndex);
  }

  if (buttonValue === ".") {
    return dotController(oldExpression, lastCaracter);
  } else if (brackets.test(buttonValue)) {
    return !oldExpression && buttonValue === ")" ? false : true;
  } else {
    return oldExpression === "0" ? false : true;
  }
};

const displayOnScreen = (e) => {
  const value = e.target.innerText;
  if (isInputValid(inOut.innerText, value)) {
    inOut.innerText += value;
  }
};

for (let button of buttons) {
  const value = button.innerText;
  if (value !== "C" && value !== "=") {
    button.addEventListener("click", (e) => displayOnScreen(e));
  } else if (value !== "C") {
    button.addEventListener("click", (e) => cleanScreen(e));
  } else {
    button.addEventListener("click", (e) => calculate(e));
  }
}
