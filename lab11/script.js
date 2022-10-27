const rectangles = document.querySelectorAll('.rectangle');
const wrapper = document.querySelector('.wrapper');
const blocks = document.querySelectorAll('.block');
const wrapperBorders = wrapper.getBoundingClientRect();
const centralBlock = document.querySelector('.central_block');
const close = document.querySelector('.close');
const buttons = document.querySelectorAll('.button');

close.addEventListener('click', () => wrapper.style.visibility = 'hidden');

buttons.forEach(button => {

    button.addEventListener('click', event => {

        const buttonStyle = getComputedStyle(event.target);

        const buttonColor = buttonStyle['background-color'];

        centralBlock.style.backgroundColor = buttonColor;

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

        centralBlock.style.backgroundColor = light[color];

    })

})

blocks.forEach(block => dragElement(block));
dragElement(centralBlock);

function dragElement(element) {

    const cursorPositionBefore = {x: 0, y: 0};
    const cursorPositionAfter = {x: 0, y: 0};

    const previousPosition = {
        top: element.getBoundingClientRect().top,
        left: element.getBoundingClientRect().left
    };

    let outOfBounds = false;
    
    element.onmousedown = dragMouseDown;

    function dragMouseDown(e) {

        e.target.closest('div').classList.add('moving');

        makeOnTop();

        cursorPositionBefore.x = e.clientX;
        cursorPositionBefore.y = e.clientY;

        e.preventDefault();

        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {

        e.preventDefault();

        cursorPositionAfter.x = e.clientX;
        cursorPositionAfter.y = e.clientY;

        const difference = {
            x: cursorPositionAfter.x - cursorPositionBefore.x, 
            y: cursorPositionAfter.y - cursorPositionBefore.y
        };

        cursorPositionBefore.x = e.clientX;
        cursorPositionBefore.y = e.clientY;

        const rectangleWidth = element.getBoundingClientRect().width;
        const rectangleHeight = element.getBoundingClientRect().height;

        const rectangleBorders = {
            top: element.offsetTop + difference.y,
            left: element.offsetLeft + difference.x,
            right: (element.offsetLeft + difference.x) + rectangleWidth,
            bottom: (element.offsetTop + difference.y) + rectangleHeight,
        };

		element.style.top = rectangleBorders.top + "px";
        element.style.left = rectangleBorders.left + "px";
			
        if (
            wrapperBorders.top <= rectangleBorders.top &&
            wrapperBorders.left <= rectangleBorders.left &&
            wrapperBorders.bottom >= rectangleBorders.bottom &&
            wrapperBorders.right >= rectangleBorders.right
        ) {
            outOfBounds = false;
        } else {
            outOfBounds = true;
        }
        
    }

    function closeDragElement(e) {
        e.target.closest('div').classList.remove('moving');

        if (outOfBounds) {
            element.style.top = previousPosition.top + "px";
            element.style.left = previousPosition.left + "px";
        } else {
            previousPosition.top = element.getBoundingClientRect().top;
            previousPosition.left = element.getBoundingClientRect().left;
        }

        document.onmouseup = null;
        document.onmousemove = null;
    }

    function makeOnTop() {

        if (element === centralBlock) {

            centralBlock.style.zIndex = '100';

            blocks.forEach(block => block.style.zIndex = '0');

        } else {

            centralBlock.style.zIndex = '0';

            blocks.forEach(block => {

                if (block !== element) block.style.zIndex = '0';

                else block.style.zIndex = '100';

            })

        }
    }

}