import Round from "../Round/Round"
import Home from "../Home/Home"
import Score from "../Scors/Scors";

let arrCategory= [
'Portrait', 'Landscape', 'Still Life', 'Graphic', 'Antique', 'Avant-Garde', 'Renaissance', 'Surrealism' , 'Kitsch',
    'Minimalism', 'Avangard', 'Industrial'
]

class Category {
    constructor(data, categoryType) {
        this.target = document.querySelector('#root');
        this.rounds = data;
        this.categoryType = categoryType;
        this.covers = this.setCovers();
        this.screen = `
		<div class="container">
		  <div class="logo logoMain logoCategory"></div>
		  <h2 class="settingsText settingsMenu_text text_settings">Categories</h2>
          <div class="buttons_wrapper buttons_wrapper_categories">
              <button class="buttons buttons_home">
                 <img src="./data/svg/home.svg" alt="home_btn">
                 <span class="button_name">home</span>
              </button>
             <button class="buttons buttons_home button_score">
                 <img src="./data/png/score.png" alt="score_btn">
                 <span class="button_name">score</span>
              </button>
          </div>
          <div class="categories categories_main">
          
		      ${this.covers.map((cover, index) => `
				<div class="category_item item_main item" id="${index}">
					<div class="item_header">
						<div class="item_counter item_title">
						        <div class="item_wrapper">${arrCategory[index]} ${localStorage.getItem(`score${this.categoryType}${index}`) ? `
							          <span class="item_wrapper_score">
								          ${localStorage.getItem(`score${this.categoryType}${index}`)} / 10
				                      </span>`
                                      : ''}
						        </div>
                        </div>						
					</div>
					<div class="pictures">
						<img alt="picture-category" class="${localStorage.getItem(`score${this.categoryType}${index}`) ? 'item_picture item_picture_main' : 'item_picture item_picture_main notPlay_item'}"
                             src="./data/img/${cover}.jpg" id="${index}"/>		
                           
            </div>									
				</div>
				`).join('')}
		</div>`;

        this.target.innerHTML = this.screen;
        this.target.querySelector('.container').classList.add('animation');

        this.cards = this.target.querySelectorAll('.item');

        this.target.querySelector('.button_score').addEventListener('click', this.goScore.bind(this))

        this.target.querySelector('.container').addEventListener('click', this.chooseRound.bind(this));

        this.target.querySelector('.buttons_home').addEventListener('click', this.goHome);
    }

    setCovers() {
        let data = this.rounds.flat();
        console.log(data)
        let covers = [];
        for (let i = 0; covers.length < 12; i++) {
            let num = Math.round(Math.random() * data.length);
            if (!covers.includes(num)) {
                covers.push(num);
            }
        }
        return covers;
    }

    chooseRound(event) {
        if (event.target.tagName === 'IMG') {
            let id = event.target.id;
            let questions = this.rounds[id];
            new Round(this.target, this.rounds, questions, this.categoryType, id);
        }
    }

    goHome() {
        return new Home();
    }
    goScore() {
        new Score(this.covers, this.categoryType);
    }
}

export default Category;

