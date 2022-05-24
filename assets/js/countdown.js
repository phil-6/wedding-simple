const endtime = 'September 09 2023 12:30:00 GMT+0100'

function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
        total,
        days,
        hours,
        minutes,
        seconds
    };
}

function initializeClock(endtime) {
    const countdown_days = document.querySelector('#countdown_days');
    const countdown_all = document.querySelector('#countdown_all');

    const daysDaysSpan = countdown_days.querySelector('.days')

    const daysSpan = countdown_all.querySelector('.days');
    const hoursSpan = countdown_all.querySelector('#hours');
    const minutesSpan = countdown_all.querySelector('#minutes');
    const secondsSpan = countdown_all.querySelector('#seconds');

    function updateClock() {
        const t = getTimeRemaining(endtime);

        daysDaysSpan.innerHTML = t.days;
        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);


        if (t.total <= 0) {
            clearInterval(timeinterval);
        }

        if (t.days <= 100 || t.hours <= 1) {
            countdown_days.classList.add('hidden')
            countdown_all.classList.remove('hidden')
        }

        if (t.hours >= 2 && t.minutes <= 55) {
            countdown_days.classList.remove('hidden')
            countdown_all.classList.add('hidden')
        }
    }

    updateClock();
    const timeinterval = setInterval(updateClock, 1000);
}

initializeClock(endtime);
