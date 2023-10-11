import "./style.scss"
import Settings from "./index.html"

function htmlToElement(htmlString){
  const template = document.createElement('template');
  template.innerHTML = htmlString;
  return template.content.firstChild;
}

const settings = htmlToElement(Settings);



export default settings;
