import "./style.scss"

import home from './pages/home/home';
import settings from './pages/settings/settings';
import categories from './pages/settings/settings';

const root = document.querySelector('#root');
root.append(home)

function openPage(page) {
  while (root.firstChild) {
    root.removeChild(root.firstChild)
  }
  switch (page) {
    case 'home':
      root.append(home)
      break;
    case 'settings':
      root.append(settings)
      break;
    case 'categories':
      root.append(categories)
      break;
    default:
      root.append(home)
  }
}

export default openPage
