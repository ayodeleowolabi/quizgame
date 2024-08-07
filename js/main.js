  /*----- constants -----*/
 const QUESTION_BANKtemp = {
  history: {questions: ['who was the first president of the united states?', 
                        'which ancient civilization built the pyramids?', 
                        'what year did WWII end?',
                        'who wrote the declartion of independence'], 
            choices: {
                        1: ['A: Thomas Jefferson', 'B: John Adams', 'C: George Washington', 'D: James Madison'],
                        2: ['A: Mesopotamian', 'B: Greek', 'C: Roman', 'D: Egyptian'],
                        3: ['A: 1942', 'B: 1944', 'C: 1945', 'D: 1946'],
                        4: ['A: Benjamin Franklin', 'B: Thomas Jefferson', 'C: John Hancock', 'D: James Monroe']
                      

            },
          answers: {
                        1: 'C: George Washington',
                        2: 'D: Egyptian',
                        3: 'C: 1945',
                        4:'B: Thomas Jefferson'

          }},


          // is the choice received question_bank.choices[idx of choice (event.target.id)] === questionbank.answer[idx of question]
                
  math:{},
  science:{}

 }
 
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
  let allQuestionsAnswered
  let correctAnswer
  let score
  let playerAnswer
  let homeMessage = "how much do you know about the world around you?"
  let homeIntro = "do you know stuff?"
  let category
 


  /*----- cached elements  -----*/
  let question = document.querySelector('h2')
  let answerContainer = document.getElementById('answers')
  let categoryButtons = document.getElementById('questionscategories')
  let messageDisplay = document.getElementById('message')
  

 


  /*----- event listeners -----*/
// document.getElementById('category').addEventListener('click', renderChooseCategory)
categoryButtons.addEventListener('click', handleCategoryChoice)
document.getElementById('answers').addEventListener('click', (event) => {
  renderCorrectAnswer(event)
  renderAnswers(event)
})
// use id here


  /*----- functions -----*/
init()
function init() {
  chosenQuestion = null
  questionPicked = null
  score = 0
  allQuestions = QUESTION_BANK.map((question) => question)

render()


}






function endGame() {
  if (allQuestions === 0 && score >= 9){
    question.innerText = `Congratulations! You have ${score} points! You know more than you think.`
    categoryButtons.style.display = 'none'

  } else if (allQuestions === 0 && score <= 8)
  question.innerText = `You only got ${score} points. Try again.`


  return
}

function renderCorrectAnswer(event) {
  correctAnswerIdx = chosenQuestion.correctIdx
  correctAnswer = chosenQuestion.answers[correctAnswerIdx]
  console.log(correctAnswer)

  playerAnswer = event.target.innerText
  let playerAnswerIdx = Number(playerAnswer)
  console.log(playerAnswer, correctAnswer)
  let message 
  
  if (playerAnswer === correctAnswer){
    console.log(message)
    message = "Good job"
    score++
    // why do i have to console log up there to see something?
  
  } else {
    message = `The answer was ${correctAnswer} but try the next one!`
    console.log(message)
  }

  console.log(message)
  messageDisplay.innerText = message
  setTimeout(() => {
    messageDisplay.innerText = `You have ${score} points!`
    question.innerText = 'Try a new category!'
    categoryButtons.style.display = 'flex'
    answerContainer.style.display = 'none'
  

  }, 5000)
  

  

   

  return 

}
console.log(score)

function renderAnswers() {
  
  let answerChoices = chosenQuestion.answers
  console.log(answerChoices) // how can i access my text 
  // i think i need to access playerQuestions here
console.log(answerContainer.children)
const answerButtonsArray = answerContainer.children
  // after answer is rendered, player questions must be popped out of the playernquestions array
  for (let i = 0; i < answerButtonsArray.length; i++){
    answerButtonsArray[i].innerText = answerChoices[i]
    console.log(answerButtonsArray[i])
  }


  // renderCorrectAnswer()
  correctAnswer = chosenQuestion.correctIdx

  console.log(correctAnswer)
  // for (key of answerChoices.children) {
  //   const multipleChoice = document.getElementById(`${key}--answers`)
  //   console.log(multipleChoice)
  //   return
  // }
  //if QUESTION_BANK.player[idx] is === to QUESTION_BANK.correctAnswer[idx]
  //score++ else return 



}





console.log(QUESTION_BANK.length)
function handleCategoryChoice(event) {
  console.log(QUESTION_BANK.length)
  if (allQuestions.length === 0){
    endGame()
  } else
  category = event.target.id
  renderChooseCategory()
  // let idx = Math.floor(Math.random() * allQuestions.length)
  
  
  renderChooseQuestion()
  
  // if (questionChoices === QUESTION_BANK[idx])
 
  console.log(category)
  return
 

  
}



function renderChooseCategory() {
  console.log(category)

    categoryBank = allQuestions.filter((question) => 
    question.category === category)

    console.log(QUESTION_BANK)
    console.log(categoryBank)
    console.log(allQuestions)
  return

    // let idx = Math.floor(Math.random() * QUESTION_BANK.length)
    // question.innerText = QUESTION_BANK[idx].text
    // chosenQuestion = QUESTION_BANK[idx]
  
    // answerContainer.style.display = 'flex'
    // categoryButtons.style.display = 'none'
    // // QUESTION_BANK.splice(idx, 1)
    // renderAnswers()
  
  
  }


// function renderChooseCategory() {

//   let idx = Math.floor(Math.random() * QUESTION_BANK.length)
//   question.innerText = QUESTION_BANK[idx].text
//   chosenQuestion = QUESTION_BANK[idx]

//   answerContainer.style.display = 'flex'
//   categoryButtons.style.display = 'none'
//   // QUESTION_BANK.splice(idx, 1)
//   renderAnswers()


// }

// have a function that changes the answer container, category buttons and questions div
// i need to save/ cached the intial values of the home screen. 

function renderChooseQuestion() {
  
  let idx = Math.floor(Math.random() * categoryBank.length)
  if (categoryBank.length === 0){
    question.innerText = 'You have finished all the questions in the category you selected'
    categoryButtons.style.display = 'flex'
    answerContainer.children.style.display = ''
  } else 
  question.innerText = categoryBank[idx].text
  chosenQuestion = categoryBank[idx]
  console.log(chosenQuestion)
  answerContainer.style.display = 'flex'
  categoryButtons.style.display = 'none'
  // QUESTION_BANK.splice(idx, 1)
 

  renderAnswers()

 allQuestions = allQuestions.filter((question) => question !== chosenQuestion)




  
//  QUESTION_BANK.splice(idx, 1)
  
  

  

  // answerChoices.innerText = `${QUESTION_BANK[idx].answers}`
  //something to display answer choices in box form so i can also edit the box instelf
  

  return
  // playerQuestions.pop(QUESTION_BANK[idx]) is this where this function should be?
  

}

// function renderQuestionChoice(event){
//     let idx = Math.floor(Math.random() * QUESTION_BANK.history.questions.length)


//     let questionPicked = QUESTION_BANK.history.questions[idx]
//     let questionAnswers = QUESTION_BANK.history.choices[questionPicked.idx]
//     question.innerText = questionPicked
//     console.log(questionAnswers)
//     return questionChoice 
// }

// function renderQuestionChoice(event){
//   QUESTION_BANK.forEach((question) => {
//     let idx = Math.floor(Math.random() * QUESTION_BANK.history.questions.length)

//   })
//     let questionPicked = QUESTION_BANK.history.questions[idx]
//     let questionAnswers = QUESTION_BANK.history.choices[idx]
//     question.innerText = questionPicked
//     console.log(idx)
//     return questionChoice 
// }
 


  // let questionAnswers = QUESTION_BANK.history.choices[idx]
  // console.log(questionAnswers, questionPicked)
  // question.innerText = questionPicked
  // answerButtons.innerText = q
  // return questionChoiceX
  // // correctAnswer()



function render() {
  
  renderChooseCategory()
  endGame ()
  
}