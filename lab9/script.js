const buttons = document.querySelectorAll('.button');
const item = document.querySelector('.item');
const close = document.querySelector('.close');
const wrapper = document.querySelector('.wrapper');

close.addEventListener('click', () => wrapper.style.visibility = 'hidden');

buttons.forEach(button => {

    button.addEventListener('click', event => {

        const buttonStyle = getComputedStyle(event.target);

        const buttonColor = buttonStyle['background-color'];

        item.style.backgroundColor = buttonColor;

    })

    button.addEventListener('contextmenu', event => {

        event.preventDefault();

        const color = event.target.classList[1];

        const light = {
            'red': 'rgb(253, 69, 69)', 
            'orange': 'rgb(248, 190, 82)',
            'yellow': 'rgb(243, 243, 125)',
            'green': 'rgb(10, 201, 10)',
            'light-blue': 'rgb(173, 223, 240)',
            'blue': 'rgb(40, 40, 253)',
            'purple': 'rgb(199, 23, 199)'
        };

        item.style.backgroundColor = light[color];

    })

})