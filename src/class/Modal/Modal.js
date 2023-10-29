import Question from "../Question/Question";
import EndRound from "../EndRound/EndRound";
class Modal {
  constructor(target, categoryType, categoryData, roundData, prevQuestionInfo, nextQuestionNum, isRight, score, roundId) {
    this.target = target;
    this.categoryType = categoryType;
    this.categoryData = categoryData;
    this.roundData = roundData;
    this.nextQuestionNum = nextQuestionNum;
    this.score = score;
    this.roundId = roundId;


    if (localStorage.getItem('notify') === 'true' && isRight) {
      this.audio = new Audio('./data/audio/correct-answer.wav');

      if (localStorage.getItem('volume')) {
        this.audio.volume = Number(localStorage.getItem('volume')) / 100;
      }
      this.audio.addEventListener("canplay", (event) => {
        this.audio.play();
      });
    } else if (localStorage.getItem('notify') === 'true' && !isRight) {
      this.audio = new Audio('./data/audio/incorrect-answer.mp3');

      if (localStorage.getItem('volume')) {
        this.audio.volume = Number(localStorage.getItem('volume')) / 100;
      }
      this.audio.addEventListener("canplay", (event) => {
        this.audio.play();
      });
    }

    this.screen = `
		<div class="section section_modal section_modal_show">	
		<div class="modal_content">		
				<img class="modal_answer" src="${isRight ? './data/svg/right-answer.svg' : './data/svg/wrong-answer.svg'}"/><br>
				<img class="modal_picture" src="./data/img/${prevQuestionInfo.imageNum}.jpg"/>
				<h2 class="textModal text_picture_name">${prevQuestionInfo.name}</h2>
				<p class="textModal text_author">${prevQuestionInfo.author}</p>
				<p class="textModal text_year">${prevQuestionInfo.year}</p>
				<button class="buttons button_next">next</button>	
		</div>	
		</div>`;
    this.target.innerHTML = this.screen;
    this.target.querySelector('.section_modal').classList.add('animation');
    this.target.querySelector('.modal_content').classList.add('gelatine');

    this.target.querySelector('.button_next').addEventListener('click', this.nextQuestion.bind(this));
  }

  nextQuestion() {
    if (this.nextQuestionNum < 10) {
      new Question(this.target, this.categoryType, this.categoryData, this.roundData, this.nextQuestionNum, this.score, this.roundId);
    } else {
      console.log(this.categoryData);
      new EndRound(this.target, this.categoryType, this.categoryData, this.roundData, this.score, this.roundId);
    }
  }
}
export default Modal;
