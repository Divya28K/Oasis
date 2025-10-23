// Calculator State
let currentOperand = "0";
let previousOperand = "";
let operation = undefined;
let shouldResetDisplay = false;

// DOM Elements
const currentOperandElement = document.getElementById("currentOperand");
const previousOperandElement = document.getElementById("previousOperand");

// Update Display Function
function updateDisplay() {
  currentOperandElement.textContent = currentOperand;
  if (operation != null) {
    previousOperandElement.textContent = `${previousOperand} ${operation}`;
  } else {
    previousOperandElement.textContent = "";
  }
}

// Clear All Function
function clearAll() {
  currentOperand = "0";
  previousOperand = "";
  operation = undefined;
  shouldResetDisplay = false;
  updateDisplay();

  // Remove active class from all operator buttons
  document.querySelectorAll(".btn-operator").forEach((btn) => {
    btn.classList.remove("active");
  });
}

// Clear Entry Function
function clearEntry() {
  currentOperand = "0";
  shouldResetDisplay = false;
  updateDisplay();
}

// Delete Last Character Function
function deleteLast() {
  if (currentOperand.length > 1) {
    currentOperand = currentOperand.slice(0, -1);
  } else {
    currentOperand = "0";
  }
  updateDisplay();
}

// Append Number Function
function appendNumber(number) {
  // Add button press animation
  const buttons = document.querySelectorAll(".btn-number");
  buttons.forEach((btn) => {
    if (btn.textContent === number) {
      btn.classList.add("btn-animate");
      setTimeout(() => btn.classList.remove("btn-animate"), 100);
    }
  });

  if (shouldResetDisplay) {
    currentOperand = "";
    shouldResetDisplay = false;
  }

  if (number === "." && currentOperand.includes(".")) return;

  if (currentOperand === "0") {
    if (number === ".") {
      currentOperand = "0.";
    } else {
      currentOperand = number;
    }
  } else {
    currentOperand += number;
  }

  updateDisplay();
}

// Set Operation Function
function setOperation(nextOperation) {
  // Remove active class from all operator buttons
  document.querySelectorAll(".btn-operator").forEach((btn) => {
    btn.classList.remove("active");
  });

  // Add active class to clicked button
  const operatorButtons = document.querySelectorAll(".btn-operator");
  operatorButtons.forEach((btn) => {
    if (btn.textContent === nextOperation) {
      btn.classList.add("active");
    }
  });

  if (previousOperand === "") {
    previousOperand = currentOperand;
  } else if (operation) {
    const result = performCalculation();
    if (result === null) return; // Error occurred

    currentOperand = result.toString();
    previousOperand = currentOperand;
  }

  operation = nextOperation;
  shouldResetDisplay = true;
  updateDisplay();
}

// Perform Calculation Function
function performCalculation() {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current)) return null;

  let result;

  switch (operation) {
    case "+":
      result = prev + current;
      break;
    case "−":
    case "-":
      result = prev - current;
      break;
    case "×":
    case "*":
      result = prev * current;
      break;
    case "÷":
    case "/":
      if (current === 0) {
        showError("Cannot divide by zero");
        return null;
      }
      result = prev / current;
      break;
    default:
      return null;
  }

  // Handle very large or very small numbers
  if (result === Infinity || result === -Infinity) {
    showError("Result too large");
    return null;
  }

  if (isNaN(result)) {
    showError("Invalid operation");
    return null;
  }

  // Format the result
  if (result.toString().length > 12) {
    if (Math.abs(result) > 1e12 || Math.abs(result) < 1e-6) {
      result = result.toExponential(6);
    } else {
      result = parseFloat(result.toFixed(8));
    }
  }

  return result;
}

// Calculate Function
function calculate() {
  // Add animation to equals button
  const equalsBtn = document.querySelector(".btn-equals");
  equalsBtn.classList.add("btn-animate");
  setTimeout(() => equalsBtn.classList.remove("btn-animate"), 100);

  if (operation === undefined || shouldResetDisplay) return;

  const result = performCalculation();
  if (result === null) return;

  currentOperand = result.toString();
  operation = undefined;
  previousOperand = "";
  shouldResetDisplay = true;

  // Remove active class from all operator buttons
  document.querySelectorAll(".btn-operator").forEach((btn) => {
    btn.classList.remove("active");
  });

  updateDisplay();
}

// Error Display Function
function showError(message) {
  currentOperand = "Error";
  currentOperandElement.classList.add("error");
  updateDisplay();

  setTimeout(() => {
    currentOperandElement.classList.remove("error");
    clearAll();
  }, 1500);
}

// Keyboard Support
document.addEventListener("keydown", function (event) {
  const key = event.key;

  // Prevent default behavior for calculator keys
  if (
    "0123456789+-*/.=Enter".includes(key) ||
    key === "Escape" ||
    key === "Backspace"
  ) {
    event.preventDefault();
  }

  // Number keys
  if ("0123456789".includes(key)) {
    appendNumber(key);
  }

  // Decimal point
  if (key === ".") {
    appendNumber(".");
  }

  // Operations
  if (key === "+") {
    setOperation("+");
  }
  if (key === "-") {
    setOperation("−");
  }
  if (key === "*") {
    setOperation("×");
  }
  if (key === "/") {
    setOperation("÷");
  }

  // Equals
  if (key === "=" || key === "Enter") {
    calculate();
  }

  // Clear
  if (key === "Escape") {
    clearAll();
  }

  // Backspace
  if (key === "Backspace") {
    deleteLast();
  }
});

// Touch/Click Feedback
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("touchstart", function () {
    this.style.transform = "scale(0.95)";
  });

  button.addEventListener("touchend", function () {
    this.style.transform = "";
  });

  button.addEventListener("mousedown", function () {
    this.style.transform = "scale(0.95)";
  });

  button.addEventListener("mouseup", function () {
    this.style.transform = "";
  });

  button.addEventListener("mouseleave", function () {
    this.style.transform = "";
  });
});

// Initialize display on page load
document.addEventListener("DOMContentLoaded", function () {
  updateDisplay();

  // Add subtle animations on load
  const calculator = document.querySelector(".calculator");
  calculator.style.opacity = "0";
  calculator.style.transform = "translateY(20px)";

  setTimeout(() => {
    calculator.style.transition = "all 0.5s ease";
    calculator.style.opacity = "1";
    calculator.style.transform = "translateY(0)";
  }, 100);
});

// Memory functions (bonus features)
let memory = 0;

function memoryStore() {
  memory = parseFloat(currentOperand) || 0;
  showMemoryIndicator("MS");
}

function memoryRecall() {
  currentOperand = memory.toString();
  shouldResetDisplay = true;
  updateDisplay();
  showMemoryIndicator("MR");
}

function memoryClear() {
  memory = 0;
  showMemoryIndicator("MC");
}

function memoryAdd() {
  memory += parseFloat(currentOperand) || 0;
  showMemoryIndicator("M+");
}

function memorySubtract() {
  memory -= parseFloat(currentOperand) || 0;
  showMemoryIndicator("M-");
}

function showMemoryIndicator(operation) {
  const indicator = document.createElement("div");
  indicator.textContent = operation;
  indicator.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 105, 180, 0.9);
        color: white;
        padding: 8px 12px;
        border-radius: 15px;
        font-size: 12px;
        font-weight: bold;
        z-index: 1000;
        animation: fadeInOut 1s ease;
    `;

  document.body.appendChild(indicator);

  setTimeout(() => {
    document.body.removeChild(indicator);
  }, 1000);
}

const style = document.createElement("style");
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateY(-10px); }
        50% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-10px); }
    }
`;
document.head.appendChild(style);