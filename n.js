const toggle = document.getElementById('toggle');
const body = document.body;
const text1 = document.getElementById('line1');
const text2 = document.getElementById('line2');
let running = false;

// Modify the click event listener
toggle.addEventListener('click', () => {
    if (running) return;
    running = true;
    
    // Use requestAnimationFrame for better mobile performance
    requestAnimationFrame(() => {
        text1.classList.remove('animate-forward', 'animate-backward');
        text2.classList.remove('animate-forward', 'animate-backward');
        
        requestAnimationFrame(() => {
            text2.classList.add('animate-forward');
            text1.classList.add('animate-backward');
            toggle.classList.add('textTransition', 'active');
            toggle.classList.remove('newText');
            
            setTimeout(() => {
                body.classList.toggle('light');
                toggle.classList.replace('textTransition', 'newText');
            }, 400);
            
            setTimeout(() => {
                toggle.classList.remove('active');
                running = false;
            }, 800);
        });
    });
});

// Add touch events for better mobile interaction
toggle.addEventListener('touchstart', () => {
    toggle.classList.add('pressed');
});

toggle.addEventListener('touchend', () => {
    toggle.classList.remove('pressed');
});
