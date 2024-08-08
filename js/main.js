  /*----- constants -----*/ 
const QUESTION_BANK = [
  {
    category: 'History',
    text: 'Who was president in 1996?',
    answers: [
      'Jimmy Carter',
      'Bill Clinton',
      'George Washington',
      'George Bush Sr.'
    ],
    correctIdx: 1,
    playerIdx: null
  },
  {
    category: 'History',
    text: 'Who was the first US president?',
    answers: [
      'John Adams',
      'Thomas Jefferson',
      'George Washington',
      'James Monroe.'
    ],
    correctIdx: 2,
    playerIdx: null
  },
  {
    category: 'History',
    text: 'which ancient civilization built the pyramids?',
    answers: [
      'Mesopotamian',
      'Greek',
      'Roman',
      'Egyptian'
    ],
    correctIdx: 3,
    playerIdx: null
  },
  {
    category: 'History',
    text: 'What year did WW1 end',
    answers: [
      '1942',
      '1944',
      '1945',
      '1946'
    ],
    correctIdx: 1,
    playerIdx: null
  },
  {
    category: 'History',
    text: 'What university did VP Kamala Harris attend?',
    answers: [
      'Havard University',
      'Howard University',
      'Hampton University',
      'Spelman University'
    ],
    correctIdx: 1,
    playerIdx: null
  },
  {
    category: 'Science',
    text: 'What is the chemical symbol for gold?',
    answers: [
      'Ag',
      'Au',
      'Fe',
      'Hg'
    ],
    correctIdx: 1,
    playerIdx: null
  },
  {
    category: 'Science',
    text: 'What is the powerhouse of the cell',
    answers: [
      'Nuclues',
      'Ribosome',
      'Mitochondrion',
      'Endoplasmic Reticulum'
    ],
    correctIdx: 2,
    playerIdx: null
  },
  {
    category: 'Science',
    text: 'What is the speed of light in a vacuum?',
    answers: [
      '300,000 meters per second',
      '30,000 meters per second',
      '300,000 kilometers per second',
      '30,000 kilometers per second'
    ],
    correctIdx: 2,
    playerIdx: null
  },
  {
    category: 'Science',
    text: 'Which gas do plants primarily use for photosynthesis?',
    answers: [
      'Oxygen',
      'Nitrogen',
      'Carbondioxide',
      'Hydrogen'
    ],
    correctIdx: 2,
    playerIdx: null
  },
  {
    category: 'Science',
    text: 'Who was the first African American woman to receive a Ph.D. in chemistry in the United States?',
    answers: [
      'Mae Jemison',
      'Marie Maynard Daly',
      'Dorothy Vaughan',
      'Katherine Johnson'
    ],
    correctIdx: 1,
    playerIdx: null
  },
  {
    category: 'Math',
    text: 'y = 3x + 5',
    answers: [
      '1',
      '3',
      '5',
      '8'
    ],
    correctIdx: 1,
    playerIdx: null
  },
  {
    category: 'Math',
    text: 'What is the solution for this equation: 2x + 4 = 12',
    answers: [
      '2',
      '3',
      '4',
      '5'
    ],
    correctIdx: 2,
    playerIdx: null
  },
  {
    category: 'Math',
    text: 'What is 25/5',
    answers: [
      '1',
      '3',
      '5',
      '8'
    ],
    correctIdx: 2,
    playerIdx: null
  },
  {
    category: 'Math',
    text: 'What is 7 * 9',
    answers: [
      '62',
      '65',
      '63',
      '72'
    ],
    correctIdx: 2,
    playerIdx: null
  },
  {
    category: 'Math',
    text: 'What is 4 + 24',
    answers: [
      '30',
      '28',
      '32',
      '29'
    ],
    correctIdx: 1,
    playerIdx: null
  },
  {
    category: 'Math',
    text: 'What is 5 + 234',
    answers: [
      '230',
      '248',
      '239',
      '229'
    ],
    correctIdx: 2,
    playerIdx: null
  },
];
    

  /*----- state variables -----*/
  let allQuestions
  let categoryBank
  let questionChoices 
  let chosenQuestion 
  let correctAnswer
  let score
  let playerAnswer
  let category
  let currentCategory
 


  /*----- cached elements  -----*/
  let question = document.querySelector('h2')
  let answerContainer = document.getElementById('answers')
  let categoryButtons = document.getElementById('questionscategories')
  let messageDisplay = document.getElementById('message')
  let playAgainButton = document.getElementById('playagain')
  let scoreDisplay = document.getElementById('score')
  

 


  /*----- event listeners -----*/
categoryButtons.addEventListener('click', handleCategoryChoice)
document.getElementById('answers').addEventListener('click', (event) => {
  renderCorrectAnswer(event)
  renderAnswers(event)
})
playAgainButton.addEventListener('click', init)


  /*----- functions -----*/
init()
function init() {
  chosenQuestion = null
  score = 0
  allQuestions = QUESTION_BANK.map((question) => question)
  playAgainButton.style.visibility = 'hidden'
  categoryButtons.style.display = 'flex'
  document.getElementById(`History`).style.display = 'flex'
  document.getElementById(`Science`).style.display = 'flex'
  document.getElementById(`Math`).style.display = 'flex'
  question.innerText = 'how much do you know about the world around you?'
  messageDisplay.innerText = 'click a category to begin! You get 1 point with each correct answer. If you get 12 points, you win'
  scoreDisplay.innerHTML = ''
render()
};




function endGame() {
  if (allQuestions.length === 0 && score >= 12){
    question.innerText = `Congratulations! You have ${score} points! You know more than you think.`
    categoryButtons.style.display = 'none'
    answerContainer.style.display = 'none'
    messageDisplay.innerText = "YOU WON!"
    playAgainButton.style.visibility = 'visible'
  } else if (allQuestions.length === 0 && score <= 11) {
    question.innerText = `You only got ${score} points out of 16. Try again.`
    categoryButtons.style.display = 'none'
    answerContainer.style.display = 'none'
    messageDisplay.innerText = ""
     playAgainButton.style.visibility = 'visible'
  }  
  return
};

function renderCorrectAnswer(event) {
  
  correctAnswerIdx = chosenQuestion.correctIdx
  correctAnswer = chosenQuestion.answers[correctAnswerIdx]
  playerAnswer = event.target.innerText
  let playerAnswerIdx = Number(playerAnswer)
  let message 
  if (playerAnswer === correctAnswer){
    
    message = "You earned 1 point."
    score++
  } else {
    message = `The answer was ${correctAnswer} but try the next one!`
  }
  
  messageDisplay.innerText = message
  setTimeout(() => {
    messageDisplay.innerText = ``
    question.innerText = 'Try a new category!'
    categoryButtons.style.display = 'flex'
    answerContainer.style.display = 'none'
    scoreDisplay.innerText = score
    endGame()
  

  }, 2000)
  return 

};

function renderAnswers() {
  
  let answerChoices = chosenQuestion.answers
  const answerButtonsArray = answerContainer.children
  for (let i = 0; i < answerButtonsArray.length; i++){
    answerButtonsArray[i].innerText = answerChoices[i]
  }
  correctAnswer = chosenQuestion.correctIdx
};



function handleCategoryChoice(event) {
  category = event.target.id
  messageDisplay.innerText = " "
  renderChooseCategory()
  renderChooseQuestion()

  return
};



function renderChooseCategory() {

    categoryBank = allQuestions.filter((question) => 
    question.category === category)
    currentCategory = category
  return  
  
  };



function renderChooseQuestion() {
  
  let idx = Math.floor(Math.random() * categoryBank.length)
  let currentCategoryArray = categoryButtons.children
  question.innerText = categoryBank[idx].text
  chosenQuestion = categoryBank[idx]
  answerContainer.style.display = 'flex'
  categoryButtons.style.display = 'none'



  renderAnswers()

 allQuestions = allQuestions.filter((question) => question !== chosenQuestion)
 const currentCategoryQuestions = allQuestions.filter((question) => question.category === currentCategory)
 if (currentCategoryQuestions.length === 0){
  document.getElementById(`${currentCategory}`).style.display = 'none'
 }
  return
};




function render() {
  
  renderChooseCategory()
 
  
};