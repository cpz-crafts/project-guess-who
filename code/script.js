// All the DOM selectors stored as short variables
const board = document.getElementById('board')
const questions = document.getElementById('questions')
const restartButton = document.getElementById('restart')
const findOutButton = document.getElementById('filter')
const playAgainButton = document.getElementById('playAgain')



// Array with all the characters, as objects
const CHARACTERS = [
  {
    name: 'Jabala',
    img: 'images/jabala.svg',
    hair: 'hidden',
    eyes: 'hidden',
    accessories: ['glasses', 'hat'],
    other: []
  },
  {
    name: 'Jack',
    img: 'images/jack.svg',
    hair: 'hidden',
    eyes: 'blue',
    accessories: ['hat'],
    other: []
  },
  {
    name: 'Jacques',
    img: 'images/jacques.svg',
    hair: 'grey',
    eyes: 'blue',
    accessories: ['hat'],
    other: ['smoker']
  },
  {
    name: 'Jai',
    img: 'images/jai.svg',
    hair: 'black',
    eyes: 'brown',
    accessories: [],
    other: []
  },
  {
    name: 'Jake',
    img: 'images/jake.svg',
    hair: 'yellow',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'James',
    img: 'images/james.svg',
    hair: 'brown',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jana',
    img: 'images/jana.svg',
    hair: 'black',
    eyes: 'hidden',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jane',
    img: 'images/jane.svg',
    hair: 'yellow',
    eyes: 'hidden',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jaqueline',
    img: 'images/jaqueline.svg',
    hair: 'orange',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },

  {
    name: 'Jazebelle',
    img: 'images/jazebelle.svg',
    hair: 'purple',
    eyes: 'hidden',
    accessories: ['glasses'],
    other: ['smoker']
  },
  {
    name: 'Jean',
    img: 'images/jean.svg',
    hair: 'brown',
    eyes: 'blue',
    accessories: ['glasses', 'hat'],
    other: ['smoker']
  },
  {
    name: 'Jeane',
    img: 'images/jeane.svg',
    hair: 'brown',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jed',
    img: 'images/jed.svg',
    hair: 'orange',
    eyes: 'green',
    accessories: ['glasses', 'hat'],
    other: ['smoker']
  },
  {
    name: 'Jenni',
    img: 'images/jenni.svg',
    hair: 'white',
    eyes: 'hidden',
    accessories: ['hat'],
    other: []
  },
  {
    name: 'Jeri',
    img: 'images/jeri.svg',
    hair: 'orange',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jerry',
    img: 'images/jerry.svg',
    hair: 'hidden',
    eyes: 'blue',
    accessories: ['hat'],
    other: []
  },
  {
    name: 'Jess',
    img: 'images/jess.svg',
    hair: 'black',
    eyes: 'blue',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jocelyn',
    img: 'images/jocelyn.svg',
    hair: 'black',
    eyes: 'brown',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jon',
    img: 'images/jon.svg',
    hair: 'brown',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jordan',
    img: 'images/jordan.svg',
    hair: 'yellow',
    eyes: 'hidden',
    accessories: ['glasses', 'hat'],
    other: []
  },
  {
    name: 'Josephine',
    img: 'images/josephine.svg',
    hair: 'grey',
    eyes: 'brown',
    accessories: [],
    other: []
  },
  {
    name: 'Josh',
    img: 'images/josh.svg',
    hair: 'yellow',
    eyes: 'green',
    accessories: [],
    other: []
  },
  {
    name: 'Jude',
    img: 'images/jude.svg',
    hair: 'black',
    eyes: 'green',
    accessories: [],
    other: []
  },
  {
    name: 'Julie',
    img: 'images/julie.svg',
    hair: 'black',
    eyes: 'brown',
    accessories: ['glasses', 'hat'],
    other: []
  },
]

// Global variables
let secret
let currentQuestion
let charactersInPlay
let keep

//sound

const sounWinner =()=> {}

const soundLose =() =>{}

// Draw the game board
const generateBoard = () => {
  board.innerHTML = ''
  charactersInPlay.forEach((person) => {
    board.innerHTML += `
      <div class="card">
        <p>${person.name}</p>
        <img src=${person.img} alt=${person.name}>
         <div class="guess">
          <span>Guess on ${person.name}?</span>
          <button class="filled-button small" 
          onclick="guess('${person.name}')">Guess</button>
        </div>
      </div>
    `
  })
}

// Randomly select a person from the characters array and set as the value of the variable called secret
const setSecret = () => {
  secret = charactersInPlay[Math.floor(Math.random() * charactersInPlay.length)]
 
};

// This function to start (and restart) the game
const start = () => {
  // 3. Show the win or lose section
  winOrLose.style.display = "none"
  // 4. Hide the game board
  board.style.display = "flex"
  // Here we're setting charactersInPlay array to be all the characters to start with
  charactersInPlay = CHARACTERS
  // What else should happen when we start the game?
  generateBoard(); 
  setSecret(); // invoke the funtion so the computer select the secretc character
  
};

// setting the currentQuestion object when you select something in the dropdown
const selectQuestion = () => {
  const category = questions.options[questions.selectedIndex].parentNode.label

  // This variable stores what option group (category) the question belongs to.
  // We also need a variable that stores the actual value of the question we've selected.
   const value = questions.options[questions.selectedIndex].value

  currentQuestion = {
    category: category,
    value: value
  }

}

// This function should be invoked when you click on 'Find Out' button. (step4)
const checkQuestion = () => {
  selectQuestion();
  const { category, value } = currentQuestion
  // Compare the currentQuestion details with the secret person details in a 
  // different manner based on category (hair/eyes or accessories/others).
  // See if we should keep or remove people based on that
  // Then invoke filterCharacters
 
  if (category === 'hair' || category === 'eyes') {
    if (value === secret[category]) {
      keep = true
      } else {
        keep = false
    }

  } else if (category === 'accessories' || category === 'other') {
     if (secret[category].includes(value)) {
      keep = true
      } else {
        keep = false
     }

    }
  
  filterCharacters(keep)
}

// It'll filter the characters array and redraw the game board.
const filterCharacters = (keep) => {

  const { category, value } = currentQuestion
 
  // Show the correct alert message for different categories
  if (category === "accessories") {
    if (keep) {
      alert (`Yeees, the person wears ${value}! Keep all people that wears${value}.`)
    } else  {
      alert (`oh no, the person doesn't wear ${value}! Remove all people that wears. ${value}.`)
    }

} else if (category === "hair") {
    if (keep) {
      alert (`Yaay, the person has ${value} hair! Keep all people with ${value} hair.`)
    } else  {
      alert (`oh no, the person doesnt have ${value} hair! Remove all people with ${value} hair.`)
    }

} else if (category === "eyes") {
    if (keep) {
      alert (`Yeah, the person have ${value} eyes! Keep all people with ${value} eyes.`)
    } else  {
      alert (`oh no, the person doesnt have ${value} eyes! Remove all people with ${value} eyes.`)
    }

} else if (category === "other") {
    if (keep) {
      alert (`yuhuu, the person have ${value}! Keep all people with ${value}.`)
    } else  {
      alert (`oh no, the person doesnt have ${value}! Remove all people with ${value}.`)
    }
  }
  
   
  //for hair and eyes :
  if (category === "hair" || category === "eyes")
    if (keep) {
      charactersInPlay = charactersInPlay.filter((person) => person[category] === value);
    } else {
      charactersInPlay = charactersInPlay.filter((person) => person[category] !== value);
    }

    // for accessories and other
    if (category === "accessories"|| category === "other")
    if (keep) {
      charactersInPlay = charactersInPlay.filter((person) => person[category].includes(value));
    } else {
      charactersInPlay = charactersInPlay.filter((person) => !person[category].includes(value));
    }


    // Invoke a function to redraw the board with the remaining people.
    generateBoard();
   
  }

 

// when clicking guess, the player first have to confirm that they want to make a guess.
const guess = (personToConfirm) => {


  if (confirm (`Are you sure you want to make a guess on ${personToConfirm}?`)){
    const playerGuess = personToConfirm
    checkMyGuess(playerGuess)
  }

// store the interaction from the player in a variable.
  // remember the confirm() ?
  // If the player wants to guess, invoke the checkMyGuess function.
}

// If you confirm, this function is invoked
const checkMyGuess = (personToConfirm) => {
  // 1. Check if the personToCheck is the same as the secret person's name
   if ( secret.name === personToConfirm) {
     winOrLoseText.innerHTML = `That's impressive! you are right it is ${secret.name}!`
    }

  // 2. Set a Message to show in the win or lose section accordingly
  else {
    winOrLoseText.innerHTML = `Oh no you lost is was ${secret.name}!` 
   }
// 3. Show the win or lose section
   winOrLose.style.display = "flex"
// 4. Hide the game board
   board.style.display = "none"
  
  }


 





// Invokes the start function when website is loaded
start()

// All the event listeners
restartButton.addEventListener('click', start)
findOutButton.addEventListener('click', checkQuestion)
playAgainButton.addEventListener('click', start)


