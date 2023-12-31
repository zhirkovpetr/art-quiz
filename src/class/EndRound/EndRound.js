import Category from "../Category/Category";

class EndRound {
    constructor(target, categoryType, categoryData, roundData, score, roundId) {
        this.target = target;
        this.categoryType = categoryType;
        this.categoryData = categoryData;
        this.roundData = roundData;
        this.score = score;
        this.roundId = roundId;

        if (this.score >= 0) {
            localStorage.setItem(`${this.categoryType}${this.roundId}`, 'true');
            localStorage.setItem(`score${this.categoryType}${this.roundId}`, `${this.score}`);
        }

        if (localStorage.getItem('checkVolume') === 'true' && this.score > 5) {
            this.audio = new Audio('./data/audio/correct-round.mp3');

            if (localStorage.getItem('volumeChecker')) {
                this.audio.volume = Number(localStorage.getItem('volumeChecker')) / 100;
            }

            this.audio.addEventListener("canplay", () => {
                this.audio.play();
            });
        } else if (localStorage.getItem('checkVolume') === 'true' && this.score < 6) {
            this.audio = new Audio('./data/audio/incorrect-round.mp3');

            if (localStorage.getItem('volumeChecker')) {
                this.audio.volume = Number(localStorage.getItem('volumeChecker')) / 100;
            }

            this.audio.addEventListener("canplay", () => {
                this.audio.play();
            });
        }
        this.stars = this.setStars(this.score);
        this.screen = `
          <div class="section_modal">
			<div class="modal_content">	
				<h2 class="textModal modal_text">${this.score === 10 ? 'Супер!' : this.score > 7 ? 'Отлично!' : this.score > 5 ? 'Молодец!' : 'Попробуй еще'}</h2>
				<div class="stars_container">
					${this.stars.length
                ? this.stars.map(star => star = `<img class="star" src="../../data/png/star.png" alt="picture-star"/>`).join('')
                : '<img class="star" src="../../data/png/gameover.png" alt="picture-gameover"/>'}
				</div>
				<p class="textModal text_results">Ваш результат: ${this.score}</p>
				<button class="buttons button_next">Category</button>	
		  </div>
		</div>`;

        this.target.innerHTML = this.screen;
        this.target.querySelector('.section_modal').classList.add('animation');
        this.target.querySelector('.modal_content').classList.add('grow');


        this.target.querySelector('.button_next').addEventListener('click', this.finishRound.bind(this));
    }

    setStars(score) {
        let result = [];
        if (score === 10) {
            result = ['', '', ''];
        } else if (score > 7) {
            result = ['', ''];
        } else if (score > 5) {
            result = [''];
        }
        return result;
    }

    finishRound() {
        new Category(this.categoryData, this.categoryType);
    }
}

export default EndRound;
