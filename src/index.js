import home from './features/Home/index';
import settings from './features/Settings/index';
import "./style.scss"

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

export default openPage
