/* eslint-disable require-jsdoc */
import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({button, drawer, content}) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();

    const skipLinkElem = document.querySelector('.skip-to-content');
    if (skipLinkElem) {
      skipLinkElem.addEventListener('keydown', (event) => {
        if (event.keyCode === 13) {
          event.preventDefault();
          const mainElem = document.querySelector('main');
          if (mainElem) {
            mainElem.focus();
          }
        }
      });
    }
  }
}

export default App;
