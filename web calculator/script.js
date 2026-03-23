let currentInput = '0';

function updateDisplay() {
    document.getElementById('display').innerText = currentInput;
}

function appendNumber(num) {
    if (currentInput === '0' && num !== '.') {
        currentInput = num;
    } else {
        if (num === '.' && currentInput.split(/[\+\-\*\/]/).pop().includes('.')) return;
        currentInput += num;
    }
    updateDisplay();
}

function appendOperator(op) {
    const lastChar = currentInput.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) {
        currentInput = currentInput.slice(0, -1) + op;
    } else {
        currentInput += op;
    }
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    if (currentInput === '') currentInput = '0';
    updateDisplay();
}

function calculate() {
    try {
        // Evaluates the math string
        let result = new Function('return ' + currentInput)();
        // Rounds to 8 decimal places to avoid messy numbers like 0.30000000000000004
        currentInput = String(Math.round(result * 100000000) / 100000000);
    } catch (e) {
        currentInput = "Error";
    }
    updateDisplay();
}

// NEW: Square Root Function
function calculateSquareRoot() {
    try {
        // First, calculate whatever is currently on the screen
        let currentVal = new Function('return ' + currentInput)();
        
        // Then, find the square root
        let result = Math.sqrt(currentVal);
        
        // If they try to find the square root of a negative number, show an error
        if (isNaN(result)) {
            currentInput = "Error";
        } else {
            // Round it neatly
            currentInput = String(Math.round(result * 100000000) / 100000000);
        }
    } catch (e) {
        currentInput = "Error";
    }
    updateDisplay();
}