import Settings from "../Settings/Settings"
import Category from "../Category/Category"
import home from "../../view/home/home.html"


class Home {
  constructor() {
    this.target = document.querySelector('#root');
    this.screen = home;
    this.target.innerHTML = this.screen;
    this.target.querySelector('.container').classList.add('animation');

    this.categories = document.querySelectorAll('.categoryQuiz');
    this.categories.forEach(category => category.addEventListener('click', this.choseCategory.bind(this)));

    this.buttons_settings = this.target.querySelector('.buttons_settings').addEventListener('click', this.goSettings);

  }

  async choseCategory(event) {
    let url = './images.json'
    console.log(url)
    let data = await this.fetchData(url);
    console.log(data)

    let artsData = [...data];
    const artsQuestions = [];

    if (event.target.id === 'arts') {
      artsData = data.slice(0, data.length / 2);
      artsData.forEach(item => item.question = `Автором какой из этих картин является <br/> ${item.author}?`);
    } else {
      artsData = data.slice(data.length / 2);
      artsData.forEach(item => item.question = `Кто написал картину <br/> ${item.name}?`);
    }

    for (let i = 0; i < artsData.length; i += 10) {
      let copyArr = [...artsData];
      artsQuestions.push(copyArr.slice(i, i + 10));
    }

    new Category(artsQuestions, event.target.id);
  }

  async fetchData(url) {
    const response = await fetch(url);
    return await response.json();
  }
  goSettings() {
    return new Settings();
  }
}

export default Home;
