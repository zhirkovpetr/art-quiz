import shuffleArray from "../../settings/shuffleArray";
import Modal from "../Modal/Modal";
class Question {
  constructor(target, categoryType, categoryData, roundData, questionNum, score, roundId) {
    this.target = target;
    this.categoryType = categoryType;
    this.categoryData = categoryData;
    this.roundData = roundData;
    this.questionNum = questionNum;
    this.score = score;
    this.roundId = roundId;
    this.rightAnswer = this.categoryType === 'arts' ? Number(roundData[this.questionNum].imageNum) : roundData[this.questionNum].author;
    this.allVariants = this.setVariants(this.categoryType);
    this.screen = this.categoryType === 'arts' ?
      `<div class="container container_question">
             <div class="buttons_wrapper buttons_wrapper_category buttons_wrapper_question">
                    <button class="buttons buttons_home buttons_home_width">
                         <img src="./data/svg/home.svg" alt="home_btn">
                         <span>home</span>
                    </button>
                    <h2 class="textQuest text_artists">"${this.roundData[this.questionNum].question}"</h2>
                    ${localStorage.getItem('timer') === 'true' ? `<p class="question_timer">${localStorage.getItem('seconds')}</p>` : ''}
                    <button class="buttons buttons_category buttons_category_width">
                          <img src="./data/svg/category.svg" alt="home_btn">
                          <span>categories</span>
                    </button>
             </div>
             <div class="pictures_picture variants_container">
             ${this.allVariants.map((variant, index) => `
		      <div class="pictures_picture_item" id="${index}">
                    <img src=".data/img/${variant}.jpg" id="a${index}" alt="picture-question"/>
              </div>`).join('')}
             </div>
        </div>`
      : `<div class="container container_question">
             <div class="buttons_wrapper buttons_wrapper_category buttons_wrapper_question">
                   <button class="buttons buttons_home buttons_home_width">
                          <img src="./data/svg/home.svg" alt="home_btn">
                          <span>home</span>
                   </button>
                   <h2 class="textQuest text_artists">"${this.roundData[this.questionNum].question}"</h2>
                   ${localStorage.getItem('timer') === 'true' ? `<p class="question_timer">${localStorage.getItem('seconds')}</p>` : ''}
                   <button class="buttons buttons_category buttons_category_width">
                           <img src="./data/svg/category.svg" alt="home_btn">
                           <span>categories</span>
                   </button>
             </div>
             <div class="artists_picture">
                  <img class="question-image" src="./data/img/${this.roundData[this.questionNum].imageNum}.jpg"/>
             </div>
             <div class="answer">
             <ul class="answers_wrapper variants_container">${this.allVariants.map((variant, index) => `
		            <li class="answers_answer" id="a${index}">${variant}</li>`).join('')}
		     </ul>             
               </div>
               </div>`;

    this.target.innerHTML = this.screen;
    this.target.querySelector('.container_question').classList.add('animation');

    this.timer = this.target.querySelector('.question_timer');
    if (this.thimer) {
      this.timer.classList.add('shake');
    }
    this.variants_container = this.target.querySelector('.variants_container');
    this.variants_container.addEventListener('click', this.chooseAnswer.bind(this));
    this.headerIteration;
    this.timerGlobal;
    clearTimeout(this.timerGlobal);
    if (this.timer) {
      this.tiktac(this.timer.textContent)
    };
  }

  chooseAnswer(event) {
    clearTimeout(this.timerGlobal);
    let id = Number(event.target.id.charAt(1));
    let isRight = id === this.allVariants.indexOf(this.rightAnswer);
    let nextQuestionNum = this.questionNum;
    let score = this.score;
    if (isRight) {
      score += 1;
    };
    nextQuestionNum += 1;

    if (this.questionNum < 10) {
      new Modal(this.target, this.categoryType, this.categoryData, this.roundData, this.roundData[this.questionNum], nextQuestionNum, isRight, score, this.roundId);
    }
  }
  tiktac(num) {
    let prop = Number(num);
    console.log(prop);
    this.timer.innerHTML = prop;
    if (prop >= 0) {
      prop -= 1;
    }
    let nextQuestionNum = this.questionNum;
    let timerId = setTimeout(this.tiktac.bind(this, [prop]), 1000);

    this.timerGlobal = timerId;

    if (prop === -1) {
      clearTimeout(timerId);
      nextQuestionNum += 1;
      new Modal(this.target, this.categoryType, this.categoryData, this.roundData, this.roundData[this.questionNum], nextQuestionNum, false, this.score);
    }
    if (prop >= 0) {
      timerId;
    }
  }
  setHeader() {
    if (!this.headerIteration) {
      this.headerIteration = 0;
    }
    this.headerIteration += 1;
    if (this.headerIteration < 2) {
      this.header = new Question_header(this.categoryType, this.categoryData, this.timerGlobal);
    }
  }
  setVariants(type) {
    let variants = [this.rightAnswer];

    if (type === 'arts') {
      for (let i = 0; variants.length < 4; i++) {
        let questionNum = Math.round(Math.random() * 120);
        if (!variants.includes(questionNum)) {
          variants.push(questionNum);
        }
        ;
      }
      ;
    } else {
      for (let i = 0; variants.length < 4; i++) {
        let questionNum = Math.round(Math.random() * 120);
        if (!variants.includes(this.categoryData.flat()[questionNum].author)) {
          variants.push(this.categoryData.flat()[questionNum].author);
        };
      };
    }
    return shuffleArray(variants);
  }
}
export default Question
