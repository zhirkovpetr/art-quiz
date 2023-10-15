function htmlElement(htmlString) {
  const template = document.createElement('template');
  template.innerHTML = htmlString;
  return template.content.firstChild;
}

export default htmlElement
