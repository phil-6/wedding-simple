function updateOrder() {
    const order = document.querySelector('#order')

    const orderItems = document.querySelectorAll('li')

    const arrive = order.querySelector('#arrive')
    const start = order.querySelector('#start')
    const one = order.querySelector('#one')
    const two = order.querySelector('#two')
    const three = order.querySelector('#three')
    const four = order.querySelector('#four')
    const five = order.querySelector('#five')
    const six = order.querySelector('#six')
    const seven = order.querySelector('#seven')
    const eight = order.querySelector('#eight')

    const time = (new Date())
    // const hours = time.getHours()
    // const minutes = time.getMinutes()

    // for testing
    // const hours = time.getSeconds() / 2.5
    // const minutes = time.getMilliseconds() / 16
    const hours = 19
    const minutes = 50
    order.querySelector('#time_now').innerHTML = (hours + ':' + minutes + ':' + time.getSeconds() )

    orderItems.forEach(item => {
        item.classList.remove('big');
    });

    if (hours > 9 && hours < 12){ //after 9 before 12
        arrive.classList.add('big')
    }
    if ((hours >= 12 && hours < 13) || (hours === 13 && minutes < 10)){ //between 12 and 1310
        start.classList.add('big')
    }
    if ((hours >= 13 && minutes >= 10) && (hours === 13 && minutes <= 30) ){ //between 1310 and 1330
        one.classList.add('big')
    }
    if ((hours >= 13 && minutes > 30 && hours < 14) || (hours === 14 && minutes < 20)){ //after 1330 before 1420
        two.classList.add('big')
    }
    if ((hours >= 14 && minutes >= 20 && hours < 15) || (hours === 15 && minutes < 50)){ // after 1420 before 1550
        three.classList.add('big')
    }
    if ((hours >= 15 && minutes >= 50 && hours < 17) || hours === 16 || (hours === 17 && minutes < 20)){ //after 1550 before 1720
        four.classList.add('big')
    }
    if (hours === 17 && minutes >= 20 && minutes < 50){ //after 1720 before 1750
        five.classList.add('big')
    }
    if ((hours >= 17 && minutes >= 50 && hours < 18) || (hours === 18 && minutes < 50)){ //after 1750 before 1850
        six.classList.add('big')
    }
    if ((hours >= 18 && minutes >= 50 && hours < 19) || (hours === 19 && minutes < 50)){ //after 1850 before 1950
        seven.classList.add('big')
    }
    if ((hours >= 19 && minutes >= 50) || hours >= 20){ //after 1950
        eight.classList.add('big')
    }

}

updateOrder()
setInterval(updateOrder, 5 * 60 * 1000) // Update every 5 minutes