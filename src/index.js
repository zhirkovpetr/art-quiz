import './style.scss'
import Home from './class/Home/Home'

const root = document.querySelector('#root');

new Home(root);

function requireAll(r) {
  r.keys().forEach(r);
}

requireAll(require.context('./data/img/', true, /\.jpg$/));
