class Category {
  constructor(text, query) {
    this.text = text;
    this.query = query;
  }

  renderCategory(divClass) {
    const html = document.createElement('div');
    html.classList.add(divClass + '-quiz');
    document.querySelector('.mainMenu').append(html);

    const innerHtml = document.createElement('div');
    innerHtml.classList.add('mainMenu_img', 'mainMenu_' + divClass);
    html.append(innerHtml);

    const h2 = document.createElement('h2');
    h2.classList.add('text', 'mainMenu_text');
    h2.textContent = this.text.split(" ")[0] + ' '
    html.append(h2);


    const span= document.createElement('span');
    span.classList.add('text_bold');
    span.textContent= this.text.split(" ")[1]
    h2.append(span)

  }

  async clickCategory(divClass) {
    const text = document.querySelector('.' + divClass + '-quiz');
    try {
      text.addEventListener("click", function () {
        console.log(divClass);
      });
    } catch (error) {
      alert(error);
    }
  }
}

export class ArtistsQuiz extends Category {
  async renderArtists() {
    const divClass = 'artist';
    this.renderCategory(divClass);
    const testMe = async () => {
      await this.clickCategory(divClass);
    };
    await testMe();
  };
}

export class PicturesQuiz extends Category {
  async renderPictures() {
    const divClass = 'pictures';
    this.renderCategory(divClass);
    const testMe = async () => {
      await this.clickCategory(divClass);
    };
    await testMe();
  };
}

export default Category
