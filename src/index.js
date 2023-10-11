import home from './features/home/index';
import settings from './features/settings/index';
import "./style.scss"
import Button from "./components/Button/Button";
import * as button from "./components/view/button";
import buttonSettingsHome from "./data/png/buttonSettingsHome.png"
const SETTINGS= 'settings'


const root = document.querySelector('#root');
root.append(home)

function openPage(page) {
  while (root.firstChild){
    root.removeChild(root.firstChild)
  }
  if(page === 'home'){
    root.append(home)
  } else {
    root.append(settings)
  }
}

let buttonOnSetting = new Button(SETTINGS, buttonSettingsHome, button);
buttonOnSetting.renderButton();
buttonOnSetting.clickButton(SETTINGS)

export default openPage
