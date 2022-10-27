const buttons = document.querySelectorAll('.button');
const centralBlock = document.querySelector('.central_block');
const close = document.querySelector('.close');
const wrapper = document.querySelector('.wrapper');

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

const blocks = document.querySelectorAll('.block');
const leftColumn = document.querySelector('.left');
const leftColumnBorders = leftColumn.getBoundingClientRect();

blocks.forEach(block => dragBlock(block));
dragBlock(centralBlock);

function dragBlock(block) {

    const cursorPositionBefore = { x: 0, y: 0 };
    const cursorPositionAfter = { x: 0, y: 0 };
    let outOfBounds = false;

    const previousPosition = {
        top: block.getBoundingClientRect().top,
        left: block.getBoundingClientRect().left
    };

    block.onmousedown = dragMouseDown;

    function dragMouseDown(e) {

        if (block === centralBlock) block.style.transform = `rotate(0deg)`;        

        makeOnTop();

        e.target.closest('div').classList.add('moving');

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

        const blockBorders = {
            top: block.getBoundingClientRect().top + difference.y,
            left: block.getBoundingClientRect().left + difference.x,
            right: block.getBoundingClientRect().right + difference.x,
            bottom: block.getBoundingClientRect().bottom + difference.y
        };

        block.style.top = blockBorders.top + "px";
        block.style.left = blockBorders.left + "px";

        if (
            leftColumnBorders.top <= blockBorders.top &&
            leftColumnBorders.left <= blockBorders.left &&
            leftColumnBorders.bottom >= blockBorders.bottom &&
            leftColumnBorders.right >= blockBorders.right
        ) {
            outOfBounds = false;
        } else {
            outOfBounds = true;
        }

    }

    function closeDragElement(e) {
        e.target.closest('div').classList.remove('moving');

        if (outOfBounds) {
            block.style.top = previousPosition.top + "px";
            block.style.left = previousPosition.left + "px";
        } else {
            previousPosition.top = block.getBoundingClientRect().top;
            previousPosition.left = block.getBoundingClientRect().left;
        }

        if (block === centralBlock) {
            block.style.transform = `rotate(-45deg)`;
        }

        document.onmouseup = null;
        document.onmousemove = null;
    }

    function makeOnTop() {

        if (block === centralBlock) {

            centralBlock.style.zIndex = '100';

            blocks.forEach(block => block.style.zIndex = '0');

        } else {

            centralBlock.style.zIndex = '0';

            blocks.forEach(item => {

                if (item !== block) item.style.zIndex = '0';

                else item.style.zIndex = '100';

            })

        }
    }

}
