import "./style.scss"

const buttonElement = document.createElement('div');
const img = new Image;
const button = document.createElement('button');

img.classList.add('button-settings-img')
button.append(img);

buttonElement.classList.add('button-settings-buttonElement')
button.append(buttonElement);
button.classList.add('button');

export default button;
