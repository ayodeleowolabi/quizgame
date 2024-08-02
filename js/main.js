  /*----- constants -----*/
 const QUESTION_BANK = {
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
 

    
   

  /*----- state variables -----*/
  let questionChoice 
  let playerQuestions 
  let correctAnswer
  let score

  let playButton
  let playerAnswer
 


  /*----- cached elements  -----*/


  /*----- event listeners -----*/
document.querySelector('button').addEventListener('click', renderQuestionChoice)

console.log(event)

  /*----- functions -----*/
init()
function init() {
  playerQuestions = null
  questionChoice = null
  score = null
  // render()


}

// let categoryChoice = QUESTION_BANK[`${key}`]
// let playerQuestions = QUESTION_BANK[`${key}`].questions
// let correctAnswer = QUESTION_BANK[`${key}`].answers
console.log(QUESTION_BANK.history.questions.length)

function correctAnswer(){
  if(playerChoice )


}

function renderQuestionChoice(event){
  let idx = Math.floor(Math.random() * QUESTION_BANK.history.questions.length)
  let questionChoice = QUESTION_BANK.history.questions[idx]
  console.log(questionChoice)
  console.log(event)
  return questionChoice
  correctAnswer()

};



// render(
//   renderQuestionChoice()
//   // something to display play button? or all categories.
// )

// function renderCategories() {

// }