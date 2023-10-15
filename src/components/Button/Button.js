import redirect from "../../index";

export default class Button {
  constructor(text, icon, query) {
    this.text = text;
    this.icon = icon;
    this.query = query
  }

  renderButton() {
    const button = this.query.default
    document.querySelector('.container').append(button)
    button.querySelector('.button-settings-buttonElement').textContent = this.text
    button.querySelector('.button-settings-img').src = this.icon
  }

  clickButton() {
    const text = this.text
    const button = this.query.default
    button.addEventListener("click", function () {
      redirect(text)
    });
  }
}
