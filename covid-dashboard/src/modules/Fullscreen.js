/* eslint-disable no-console */

import * as Constants from './Constants';

export default class Fullscreen {
  constructor() {
    this.isFullscreen = false;
  }

  init() {
    document
      .querySelectorAll('.button-fullscreen')
      .forEach((el) =>
        el.addEventListener('click', Fullscreen.fullscreenButtonsEventHandler.bind(this))
      );
  }

  static fullscreenButtonsEventHandler(e) {
    const element = e.target.closest('.button-fullscreen');
    console.log(e.target);
    if (!element) {
      return;
    }

    switch (element.id) {
      case 'button-fullscreen-table1':
        if (this.isFullscreen) {
          Fullscreen.showAllContainers();
        } else {
          Fullscreen.hideContainers(Constants.CONTAINER_CLASSES[0]);
        }
        console.log('table1');
        this.isFullscreen = !this.isFullscreen;
        break;

      case 'button-fullscreen-table2':
        if (this.isFullscreen) {
          Fullscreen.showAllContainers();
        } else {
          Fullscreen.hideContainers(Constants.CONTAINER_CLASSES[1]);
        }
        this.isFullscreen = !this.isFullscreen;

        console.log('table2');

        break;

      default:
        break;
    }
  }

  static showAllContainers() {
    Constants.CONTAINER_CLASSES.forEach((className) => {
      const el = document.querySelector(`.${className}`);

      el.classList.remove('hide-container');
      el.classList.remove('fullscreen-container');
    });
  }

  static hideContainers(excludeClass) {
    Constants.CONTAINER_CLASSES.forEach((className) => {
      const el = document.querySelector(`.${className}`);
      if (className === excludeClass) {
        el.classList.add('fullscreen-container');
      } else {
        el.classList.add('hide-container');
      }
    });
  }
}
