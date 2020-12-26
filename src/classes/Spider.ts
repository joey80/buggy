import Bug from './Bug';

class Spider extends Bug {
  constructor() {
    super({ frames: 7, height: 90, width: 69, sprite: 'spider' });
  }
}

export default Spider;
