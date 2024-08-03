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


  
];
    
   

  /*----- state variables -----*/
  let questionChoice 
  let chosenQuestion 
  let correctAnswer
  let score

  let playButton
  let playerAnswer
  let homeMessage = "how much do you know about the world around you?"
  let homeDisplay = "do you know stuff?"
 


  /*----- cached elements  -----*/
  let question = document.querySelector('h2')
  let answerContainer = document.getElementById('answers')
  let categoryButtons = document.getElementById('questionscategories')
  let messageDisplay = document.getElementById('message')


  /*----- event listeners -----*/
document.getElementById('category').addEventListener('click', renderChooseCategory)
document.getElementById('answers').addEventListener('click', (event) => {
  renderChooseQuestion(event)
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
  


}


// when the player chooses a category, copy that categories questions from the questions bank to the playerQuestions array. 
// 
// let categoryChoice = QUESTION_BANK[`${key}`]
// let playerQuestions = QUESTION_BANK[`${key}`].questions
// let correctAnswer = QUESTION_BANK[`${key}`].answers
// console.log(QUESTION_BANK.history.questions.length)

// function correctAnswer(){
//   if(playerChoice )

// QUESTIONS:
// How do i return my screen back to the "home page for next question selection?"
// why when i tried to initialize my page with an empty 'answers' id, does in not show up again?
//
// }


function renderScore() {
  


}

function renderCorrectAnswer(event) {
  correctAnswerIdx = chosenQuestion.correctIdx
  correctAnswer = chosenQuestion.answers[correctAnswerIdx]
  console.log(correctAnswer)

  playerAnswer = event.target.innerText
  let playerAnswerIdx = Number(playerAnswer)
  console.log(playerAnswer)
  let message 
  
  if (playerAnswer === correctAnswer){
    console.log(message)
    message = "Good job"
    score++
    // why do i have to console log up there to see something?
  
  } else {
    message = ''
    console.log(message)
  }

  console.log(message)
  messageDisplay.innerText = message
  setTimeout(() => {
    messageDisplay.innerText = ""
    // categoryButtons.style.display = answerContainer

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

function renderChooseCategory() {
  let idx = Math.floor(Math.random() * QUESTION_BANK.length)
  question.innerText = QUESTION_BANK[idx].text
  chosenQuestion = QUESTION_BANK[idx]
  answerContainer.style.display = 'flex'
  categoryButtons.style.display = 'none'
  QUESTION_BANK.splice(idx, 1)
  renderAnswers()


}

// have a function that changes the answer container, category buttons and questions div
// i need to save/ cached the intial values of the home screen. 

function renderChooseQuestion() {
  
  let idx = Math.floor(Math.random() * QUESTION_BANK.length)
  question.innerText = QUESTION_BANK[idx].text
  chosenQuestion = QUESTION_BANK[idx]
  console.log(chosenQuestion)
  QUESTION_BANK.splice(idx, 1)

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
  
}