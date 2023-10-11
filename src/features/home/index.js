import "./style.scss"
import Home from "./home.html";

function htmlToElement(htmlString) {
  const template = document.createElement('template');
  template.innerHTML = htmlString;
  return template.content.firstChild;
}

const home = htmlToElement(Home);

export default home;
