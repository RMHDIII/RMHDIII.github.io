const toggle = document.getElementById('toggle');
const body = document.body;
const text1 = document.getElementById('line1');
const text2 = document.getElementById('line2');
let running = false;

toggle.addEventListener('click', () => {
    if (running) return;
    running = true;
    
    text1.classList.remove('animate-forward', 'animate-backward');
    text2.classList.remove('animate-forward', 'animate-backward');
    
    void text1.offsetWidth;
    void text2.offsetWidth;
    
    text2.classList.add('animate-forward');
    text1.classList.add('animate-backward');
    toggle.classList.add('textTransition', 'active');
    toggle.classList.remove('newText');
    
    setTimeout(() => {
        body.classList.toggle('light');
        toggle.classList.replace('textTransition', 'newText');
    }, 400);
    
    setTimeout(() => {
        text1.classList.remove('animate-forward', 'animate-backward');
        text2.classList.remove('animate-forward', 'animate-backward');
        toggle.classList.remove('active');
        running = false;
    }, 800);
});

toggle.addEventListener('mousedown', () => {
    toggle.classList.add('pressed');
});

toggle.addEventListener('mouseup', () => {
    toggle.classList.remove('pressed');
});

toggle.addEventListener('mouseleave', () => {
    toggle.classList.remove('pressed');
});
