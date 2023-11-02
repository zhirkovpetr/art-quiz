import "./home.scss"
import Home from "./home.html";
import htmlElement from "../../settings/htmlElement";
import Button from "../../class/Button/Button";
import buttonSettingsHome from "../../data/png/buttonSettingsHome.png";
import * as button from "../../view/button";
import * as category from "../../view/category";
import * as categoryClass from "../../class/Category/Category";
const SETTINGS = 'settings';

const home= htmlElement(Home)

let buttonOnSetting = new Button(SETTINGS, buttonSettingsHome, button);


let categoryItem1 = new categoryClass.ArtistsQuiz('Artists Quiz', category);
let categoryItem2 = new categoryClass.PicturesQuiz('Pictures Quiz', category);

window.onload = function() {
  buttonOnSetting.renderButton();
  categoryItem1.renderArtists();
  categoryItem2.renderPictures();
}
buttonOnSetting.clickButton()
export default home;
