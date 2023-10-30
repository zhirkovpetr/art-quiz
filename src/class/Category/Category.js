import Round from "../Round/Round"
import Home from "../Home/Home"

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
              <button class="buttons buttons_home">
                 <img src="./data/png/score.png" alt="score_btn">
                 <span class="button_name">score</span>
              </button>
          </div>
          <div class="categories categories_main">
		      ${this.covers.map((cover, index) => `
				<div class="category_item item_main item" id="${index}">
					<div class="item_header">
						<div class="item_counter item_title">
						        <div class="item_wrapper">${arrCategory[index]}</div>
                        </div>						
					</div>
					<div class="pictures">
						<img alt="picture-category" class="item_picture item_picture_main" src="./data/img/${cover}.jpg" id="${index}"/>						
                    </div>									
				</div>
				`).join('')}
		</div>`;

    /*<div class="item_total">
                             <div class="tex">score</div>
                     </div>

     <div className="info info_results">
         ${localStorage.getItem(`score${this.categoryType}${index}`) ? `
                         <div class="score-container">
                             <p class="card-score">${localStorage.getItem(`score${this.categoryType}${index}`)}</p>
                         </div>`
         : ''}
     </div>*/
    this.target.innerHTML = this.screen;
    this.target.querySelector('.container').classList.add('animation');

    this.cards = this.target.querySelectorAll('.item');

    this.cards.forEach((item, index) => {
      if (localStorage.getItem(`${this.categoryType}${index}`) === 'true') {
        item.classList.remove('stop_item');
        item.classList.add('play_item');
      }
    });

    this.round_container = this.target.querySelector('.container');
    document.addEventListener('click', this.chooseRound.bind(this));

    this.buttons_home = this.target.querySelector('.buttons_home').addEventListener('click', this.goHome);

  }

  setCovers() {
    let data = this.rounds.flat();
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
}

export default Category;
