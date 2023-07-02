function dotController(
  oldExpression,
  lastCaracter,
  isLastCaracterAMathExpressions
) {
  const currentNumbers = oldExpression.split(mathExpressions);
  const lastNumber = currentNumbers[currentNumbers.length - 1];

  (!oldExpression || isLastCaracterAMathExpressions) &&
    lastCaracter !== ")" &&
    insertZero();

  return !(lastNumber.includes(".") || lastCaracter === ")");
}

function operatorsController(
  oldExpression,
  isLastCaracterALeftBracket,
  isLastCaracterAnOperator,
  lastCaracterIndex,
  isLastCaracterADot,
  buttonValue
) {
  ((!oldExpression && !/-|\+/.test(buttonValue)) ||
    isLastCaracterALeftBracket) &&
    insertZero();
  if (isLastCaracterAnOperator || isLastCaracterADot) {
    removeLastCaracter(oldExpression, lastCaracterIndex);
  }
  return true;
}

function bracketsController(
  oldExpression,
  isLastCaracterAnOperator,
  isLastCaracterALeftBracket,
  isLastCaracterAMathExpressions,
  isLastCaracterADot,
  lastCaracterIndex,
  buttonValue,
  lastCaracter
) {
  const isButtonValueARightBracket = buttonValue === ")";
  const isButtonValueALeftBracket = buttonValue === "(";
  const leftBracketCount = oldExpression
    .split("")
    .filter((x) => x === "(").length;
  const rightBracketCount = oldExpression
    .split("")
    .filter((x) => x === ")").length;

  isLastCaracterAnOperator &&
    isButtonValueARightBracket &&
    removeLastCaracter(oldExpression, lastCaracterIndex);
  isLastCaracterADot && removeLastCaracter(oldExpression, lastCaracterIndex);
  isButtonValueALeftBracket &&
    (!isLastCaracterAMathExpressions || lastCaracter === ")") &&
    oldExpression &&
    insertMultiplicator();
  return !(
    (!oldExpression && isButtonValueARightBracket) ||
    (isLastCaracterALeftBracket && isButtonValueARightBracket) ||
    (isButtonValueARightBracket && leftBracketCount === rightBracketCount)
  );
}
