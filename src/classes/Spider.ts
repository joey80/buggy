import Bug from './Bug';

class Spider extends Bug {
  constructor() {
    super({ frames: 7, height: 90, width: 69, sprite: 'spider' });
  }

  assignBugClassName() {
    this.bug.className = 'spider';
  }

  styleDeath() {
    this.bug.style.objectPosition = `-${2 * this.width}px 100%`;
  }
}

export default Spider;
