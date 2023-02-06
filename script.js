//create 12 cards for memory game
const CARD_ARRAY = [
    {
        name: 'fries',
        img: '/images/fries.png',
    },
    {
        name: 'cheeseburger',
        img: '/images/cheeseburger.png',
    },
    {
        name: 'hotdog',
        img: '/images/hotdog.png',
    },
    {
        name: 'ice-cream',
        img: '/images/ice-cream.png',
    },
    {
        name: 'pizza',
        img: '/images/pizza.png',
    },
    {
        name: 'milkshake',
        img: '/images/milkshake.png',
    },
    {
        name: 'fries',
        img: '/images/fries.png',
    },
    {
        name: 'cheeseburger',
        img: '/images/cheeseburger.png',
    },
    {
        name: 'hotdog',
        img: '/images/hotdog.png',
    },
    {
        name: 'ice-cream',
        img: '/images/ice-cream.png',
    },
    {
        name: 'pizza',
        img: '/images/pizza.png',
    },
    {
        name: 'milkshake',
        img: '/images/milkshake.png',
    },

]

//randomize order of cards
CARD_ARRAY.sort(() => 0.5 - Math.random());

//grab the div and create the grid
const GRID_DISPLAY = document.querySelector('#grid');
const RESULT = document.querySelector('#result')

let cardsChosen = [];
let cardsChosenId = [];

const CARDS_WON = [];

function createBoard() {

    //each iteam in array creates an element
    for(let i = 0; i < 12; i++) {
        const CARD = document.createElement('img');
        CARD.setAttribute('src', '/images/blank.png');
        CARD.setAttribute('data-id', i) // set id attribute where the value will be i
        
        CARD.addEventListener('click', flipCard);//what card I click on? we listen for card clicks and flip it
        GRID_DISPLAY.append(CARD);
    }
}

createBoard();

// flip the card
function flipCard() {

    //this: use element that is clicked and get its data
    const CARD_ID = this.getAttribute('data-id');

    //push in empty array the clicked cards name
    cardsChosen.push(CARD_ARRAY[CARD_ID].name);
    cardsChosenId.push(CARD_ID);

    console.log(cardsChosen);
    console.log(cardsChosenId);

    //flip card
    this.setAttribute('src', CARD_ARRAY[CARD_ID].img);

    //check if they match
    if(cardsChosen.length === 2) {
        // timing event to see both cards. Takes function callback and time in milliseconds
        setTimeout(checkMatch, 500);
    }
    

}

function checkMatch() {

    //look for all the img elements that live in grid
    const CARDS = document.querySelectorAll('#grid img');
    console.log(CARDS);

    const OPTION_ONE_ID = cardsChosenId[0];
    const OPTION_TWO_ID = cardsChosenId[1];


    if(OPTION_ONE_ID === OPTION_TWO_ID) {
        CARDS[OPTION_ONE_ID].setAttribute('src', '/images/blank.png');
        CARDS[OPTION_TWO_ID].setAttribute('src', '/images/blank.png');
        alert("You have clicked the same image!");
    }

    if(cardsChosen[0] === cardsChosen[1]) {
        alert("you have found a match!");
        //add image white on top of the matched cards
        CARDS[OPTION_ONE_ID].setAttribute('src', '/images/white.png');
        CARDS[OPTION_TWO_ID].setAttribute('src', '/images/white.png');

        //stop listening for clicks in those spaces
        CARDS[OPTION_ONE_ID].removeEventListener('click', flipCard);
        CARDS[OPTION_TWO_ID].removeEventListener('click', flipCard);

        //push the content of CARDS to a new array
        CARDS_WON.push(cardsChosen);
    } else {
        //what happened if its not a match? flip back
        CARDS[OPTION_ONE_ID].setAttribute('src', '/images/blank.png');
        CARDS[OPTION_TWO_ID].setAttribute('src', '/images/blank.png');
        alert('Sorry, try again');
    }

    RESULT.textContent = CARDS_WON.length;

    //clean array to check new pairs
    cardsChosen = [];
    cardsChosenId = [];

    if(CARDS_WON.length === CARD_ARRAY.length/2) {
        RESULT.textContent = "CONGRATULATIONS!, YOU'VE FOUND THEM ALL!";

    } 

}
