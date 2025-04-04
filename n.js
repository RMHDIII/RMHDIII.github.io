document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('main-display');
    const historyDisplay = document.getElementById('history-display');
    const operatorDisplay = document.getElementById('operator-display');
    const keyboard = document.querySelector('.keyboard');

    let currentInput = '';
    let previousInput = '';
    let math = null;
    let resetInput = false;
    let isPhysicalKeyPress = false;

    const updateDisplay = () => {
        display.value = currentInput;
        historyDisplay.value = previousInput;
    };

    const inputHandler = (num) => {
        if (resetInput) {
            currentInput = '';
            resetInput = false;
        }
        if (num === '.' && currentInput.includes('.')) return;
        currentInput = currentInput === '' ? num : currentInput + num;
        updateDisplay();
    };

    const operatorHandler = (op) => {
        if (currentInput === '' && previousInput === '') return;
        if (previousInput !== '' && currentInput === '' && op !== '=') {
            math = op;
            operatorDisplay.textContent = op;
            operatorDisplay.classList.add('appear');
            return;
        }
        if (currentInput !== '' && previousInput !== '' && op === '=') {
            calculate();
            return;
        }
        if (math === null) {
            math = op;
            operatorDisplay.textContent = op;
            operatorDisplay.classList.add('appear');
            
            if (previousInput === '' && !isNaN(currentInput)) {
                previousInput = currentInput;
            }
            currentInput = '';
            updateDisplay();
        } 
        else if (op !== '=') {
            if (currentInput !== '') {
                calculate();
            }
            math = op;
            operatorDisplay.textContent = op;
            operatorDisplay.classList.add('appear');
            resetInput = true;
        }
    };

    const calculate = () => {
        if (!['*', '/', '+', '-'].includes(math) || currentInput === '') return;

        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        let result;

        switch(math) {
            case '+': 
                result = prev + current; 
                break;
            case '-': 
                result = prev - current; 
                break;
            case '*': 
                result = prev * current; 
                break;
            case '/': 
                result = current === 0 ? 'Error' : prev / current; 
                break;
            default: 
                return;
        }

        previousInput = result.toString();
        currentInput = '';
        math = null;
        operatorDisplay.classList.remove('appear');
        updateDisplay();
    };

    const handleBackspace = () => {
        if (currentInput.length === 1) {
            currentInput = '';
        } else if (currentInput !== '') {
            currentInput = currentInput.slice(0, -1);
        }
        updateDisplay();
    };
    keyboard.addEventListener('click', (e) => {
        if (!e.target.classList.contains('numkey') || isPhysicalKeyPress) return;
        
        const key = e.target;
        switch(key.id) {
            case 'equal':
                operatorHandler('=');
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

    // Handle physical keyboard input
    document.addEventListener('keydown', (e) => {
        isPhysicalKeyPress = true;
        
        if ((e.key >= 0 && e.key <= 9) || e.key === '.') {
            inputHandler(e.key);
        }
        else if (['*', '/', '+', '-'].includes(e.key)) {
            operatorHandler(e.key);
        }
        else if (e.key === 'Enter' || e.key === '=') {
            operatorHandler('=');
        }
        else if (e.key === 'Backspace') {
            handleBackspace();
            e.preventDefault();
        }
        else if (e.key === 'Escape') {
            currentInput = '';
            previousInput = '';
            math = null;
            operatorDisplay.classList.remove('appear');
            updateDisplay();
        }
        
        setTimeout(() => { isPhysicalKeyPress = false; }, 100);
    });
});
