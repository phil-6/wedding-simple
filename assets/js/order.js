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
    const hours = time.getHours()
    const minutes = time.getMinutes()

    // for testing
    // const hours = time.getSeconds() / 2.5
    // const minutes = time.getMilliseconds() / 16
    // const hours = 16
    // const minutes = 10
    // order.querySelector('#time_now').innerHTML = (hours + ':' + minutes + ':' + time.getSeconds() )

    orderItems.forEach(item => {
        item.classList.remove('big');
    });

    if (hours > 9 && hours < 12){ //after 9 before 12
        arrive.classList.add('big')
    }
    if ((hours >= 12 && hours < 13) || (hours === 13 && minutes < 20)){ //between 12 and 1320
        start.classList.add('big')
    }
    if ((hours >= 13 && minutes >= 20) && hours < 14){ //between 1320 and 14
        one.classList.add('big')
    }
    if (hours >= 14 && (hours <= 14 && minutes < 30)){ //after 14 before 1430
        two.classList.add('big')
    }
    if ((hours >= 14 && minutes >= 30) && hours < 16){ // after 1430 before 1600
        three.classList.add('big')
    }
    if (hours >= 16 && hours < 17){ //after 16 before 17
        four.classList.add('big')
    }
    if (hours >= 17 && hours < 18){ //after 17 before 18
        five.classList.add('big')
    }
    if (hours >= 18 && hours < 19){ //after 18 before 19
        six.classList.add('big')
    }
    if (hours >= 19 && hours < 20){ //after 19 before 20
        seven.classList.add('big')
    }
    if (hours >= 20){ //after 20
        eight.classList.add('big')
    }

}

updateOrder()
setInterval(updateOrder, 5 * 60 * 1000) // Update every 5 minutes