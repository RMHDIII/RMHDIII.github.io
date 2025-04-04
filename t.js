document.addEventListener('DOMContentLoaded', () => {
    // Get elements by ID for reliable selection
    const display = document.getElementById('main-display');
    const historyDisplay = document.getElementById('history-display');
    const operatorDisplay = document.getElementById('operator-display');
    const keyboard = document.querySelector('.keyboard');

    let currentInput = '0';
    let previousInput = '';
    let operation = null;
    let resetDisplay = false;

    // Update displays
    const updateDisplay = () => display.value = currentInput;
    const updateHistory = () => historyDisplay.value = previousInput;

    // Handle number input
    const inputHandler = (num) => {
        if (resetDisplay) {
            currentInput = '';
            resetDisplay = false;
        }
        currentInput = currentInput === '0' ? num : currentInput + num;
        updateDisplay();
    };

    // Handle operator input
    const operatorHandler = (op) => {
        if (currentInput === '') return;
        
        if (operation && !resetDisplay) {
            calculate();
            if (currentInput === 'error') return;
        }
        
        operatorDisplay.textContent = op;
        operatorDisplay.classList.add('appear');
        previousInput = currentInput;
        operation = op;
        updateHistory();
        resetDisplay = true;
    };

    // Perform calculation
    const calculate = () => {
        if (!operation) return;
        
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        let result;
        
        switch(operation) {
            case '+': result = prev + current; break;
            case '-': result = prev - current; break;
            case '*': result = prev * current; break;
            case '/': result = current === 0 ? 'error' : prev / current; break;
            default: return;
        }
        
        currentInput = String(result);
        previousInput = `${previousInput} ${operation} ${currentInput}`;
        updateDisplay();
        operation = null;
        
        setTimeout(() => {
            operatorDisplay.classList.remove('appear');
        }, 500);
    };

    // Clear calculator
    const clearAll = () => {
        currentInput = '0';
        previousInput = '';
        operation = null;
        updateDisplay();
        updateHistory();
        operatorDisplay.classList.remove('appear');
    };
    const handleBackspace = () => {
        if (currentInput.length === 1) {
            currentInput = '0';
        } else if (currentInput !== '0') {
            currentInput = currentInput.slice(0, -1);
        }
        updateDisplay();
    };

    // Button click handler
    keyboard.addEventListener('click', (e) => {
        if (!e.target.classList.contains('numkey')) return;
        
        const key = e.target;
        switch(key.id) {
            case 'equal':
                calculate();
                break;
            case 'add':
                operatorHandler('+');
                break;
            case 'minus':
                operatorHandler('-');
                break;
            case 'mult':
                operatorHandler('*');
                break;
            case 'div':
                operatorHandler('/');
                break;
            default:
                inputHandler(key.textContent);
        }
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key >= '0' && e.key <= '9') {
            inputHandler(e.key);
        }
        else if (['+', '-', '*', '/'].includes(e.key)) {
            operatorHandler(e.key);
        }
        else if (e.key === 'Enter' || e.key === '=') {
            calculate();
        }
        else if (e.key === 'Backspace') {
            handleBackspace();
            e.preventDefault();
        }
        else if (e.key==='backspace'){

        }
        else if (e.key === 'Escape') {
            clearAll();
        }
    });

    // Initialize
    updateDisplay();
});