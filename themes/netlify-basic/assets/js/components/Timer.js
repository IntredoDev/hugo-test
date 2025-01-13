export default class Timer {
    constructor() {
        this.timer = document.querySelector('[data-js-timer]');
        this.intervalId = null;
    }

    init() {
        if (!this.timer) {
            return;
        }

        this.countdown(this.timer);
    }

    countdown(timer) {
        const minutesEl = timer.querySelector('[data-js-timer-mins]');
        const secondsEl = timer.querySelector('[data-js-timer-sec]');

        let totalSeconds = parseInt(sessionStorage.getItem('totalSeconds'), 10) || 
                           (parseInt(minutesEl.textContent, 10) * 60 + parseInt(secondsEl.textContent, 10));
        
        const updateTimerDisplay = () => {
            const mins = Math.floor(totalSeconds / 60);
            const secs = totalSeconds % 60;
            minutesEl.textContent = mins.toString().padStart(2, '0');
            secondsEl.textContent = secs.toString().padStart(2, '0');
        };

        const timerInterval = setInterval(() => {
            if (totalSeconds <= 0) {
                clearInterval(timerInterval);
                sessionStorage.removeItem('totalSeconds');
                return;
            }

            totalSeconds--;
            sessionStorage.setItem('totalSeconds', totalSeconds); 
            updateTimerDisplay();
        }, 1000);

        updateTimerDisplay();
    }
}
